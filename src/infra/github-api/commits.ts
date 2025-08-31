import { Octokit, RequestError } from "octokit";
import { Endpoints } from "@octokit/types";
import { CommitDetail, CommitFile } from "@/app/types/githubCommit";
import NotFoundError from "@/errors/not-found-error";
import { GITHUB_REPOSITORY_ERROR_MESSAGES } from "@/constants/error-messages";

type ListCommitsResponse =
  Endpoints["GET /repos/{owner}/{repo}/commits"]["response"]["data"];
type CommitDetailResponse =
  Endpoints["GET /repos/{owner}/{repo}/commits/{ref}"]["response"]["data"];

const getCommits = async (
  owner: string,
  repositoryName: string,
  branch: string,
): Promise<CommitDetail[]> => {
  const octokit = new Octokit();
  let allCommits: CommitDetail[] = [];
  let page = 1;
  const perPage = 100;

  try {
    while (true) {
      const response = await octokit.request(
        "GET /repos/{owner}/{repo}/commits",
        { owner, repo: repositoryName, sha: branch, per_page: perPage, page },
      );

      if (response.data.length === 0) break;

      const commitsDetails = await Promise.all(
        response.data.map(async (commit: ListCommitsResponse[number]) => {
          const sha = commit.sha;

          const { data: commitDetail }: { data: CommitDetailResponse } =
            await octokit.request("GET /repos/{owner}/{repo}/commits/{sha}", {
              owner,
              repo: repositoryName,
              sha,
            });

          return {
            sha,
            author: commit.commit.author?.name || "Unknown",
            date: commit.commit.author?.date || "",
            message: commit.commit.message,
            files:
              commitDetail.files?.map(
                (file): CommitFile => ({
                  filename: file.filename,
                  status: file.status as CommitFile["status"],
                  patch: file.patch ?? null,
                }),
              ) ?? null,
          };
        }),
      );

      allCommits = allCommits.concat(commitsDetails);
      page += 1;
    }

    return allCommits;
  } catch (error) {
    if (error instanceof RequestError && error.status === 404) {
      throw new NotFoundError({
        message: GITHUB_REPOSITORY_ERROR_MESSAGES.NOT_FOUND,
      });
    }
    throw error;
  }
};

export { getCommits };
