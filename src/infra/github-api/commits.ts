import { Octokit, RequestError } from "octokit";
import { Endpoints } from "@octokit/types";
import { CommitDetail, CommitFile } from "@/app/types/commit";
import NotFoundError from "@/errors/not-found-error";
import { GITHUB_API } from "@/constants/github-api";

type ListCommitsResponse =
  Endpoints["GET /repos/{owner}/{repo}/commits"]["response"]["data"];
type CommitDetailResponse =
  Endpoints["GET /repos/{owner}/{repo}/commits/{ref}"]["response"]["data"];

const getCommitDetails = async (
  octokit: Octokit,
  owner: string,
  repo: string,
  sha: string,
): Promise<CommitDetail> => {
  const { data: commitDetail }: { data: CommitDetailResponse } =
    await octokit.request(GITHUB_API.ENDPOINTS.COMMITS.DETAIL, {
      owner,
      repo,
      sha,
    });

  return {
    sha,
    author: commitDetail.commit.author?.name || "Unknown",
    date: commitDetail.commit.author?.date || "",
    message: commitDetail.commit.message,
    files:
      commitDetail.files?.map(
        (file): CommitFile => ({
          filename: file.filename,
          status: file.status as CommitFile["status"],
          patch: file.patch ?? null,
        }),
      ) ?? null,
  };
};

const getCommits = async (
  owner: string,
  repositoryName: string,
  branch: string,
): Promise<CommitDetail[]> => {
  const octokit = new Octokit();
  let allCommits: CommitDetail[] = [];
  let page = 1;
  let responseData: ListCommitsResponse = [];

  try {
    do {
      const response = await octokit.request(
        GITHUB_API.ENDPOINTS.COMMITS.LIST,
        {
          owner,
          repo: repositoryName,
          sha: branch,
          per_page: GITHUB_API.DEFAULTS.PER_PAGE,
          page,
        },
      );

      responseData = response.data;

      const commitDetails = await Promise.all(
        responseData.map((commit: ListCommitsResponse[number]) =>
          getCommitDetails(octokit, owner, repositoryName, commit.sha),
        ),
      );

      allCommits = allCommits.concat(commitDetails);
      page += 1;
    } while (responseData.length > 0);

    return allCommits;
  } catch (error) {
    if (error instanceof RequestError && error.status === 404) {
      throw new NotFoundError({
        message: "GitHub repository not found.",
      });
    }
    throw error;
  }
};

export { getCommits };
