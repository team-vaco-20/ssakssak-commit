import { Octokit } from "octokit";
import { Endpoints } from "@octokit/types";
import { CommitDetail, CommitFile } from "@/app/types/commit";
import { GITHUB_API } from "@/constants/github-api";

type CommitDetailResponse =
  Endpoints["GET /repos/{owner}/{repo}/commits/{ref}"]["response"]["data"];

const getGithubCommitDetails = async (
  owner: string,
  repository: string,
  shas: string[],
): Promise<CommitDetail[]> => {
  const octokit = new Octokit();

  const commitDetails = await Promise.all(
    shas.map(async (sha) => {
      const { data: commitDetail }: { data: CommitDetailResponse } =
        await octokit.request(GITHUB_API.ENDPOINTS.COMMITS.DETAIL, {
          owner,
          repository,
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
    }),
  );

  return commitDetails;
};

export { getGithubCommitDetails };
