import { Octokit } from "octokit";
import { Endpoints } from "@octokit/types";
import { CommitDetail, CommitFile } from "@/app/types/commit";
import { GITHUB_API } from "@/constants/github-api";
import { EXCLUDED_FILES_LIST } from "@/constants/file-filters";
import { shouldExcludeFile } from "@/lib/file-filter";

type CommitDetailResponse =
  Endpoints["GET /repos/{owner}/{repo}/commits/{ref}"]["response"]["data"];

const getGithubCommitDetails = async (
  owner: string,
  repositoryName: string,
  shaList: string[],
): Promise<CommitDetail[]> => {
  const octokit = new Octokit();

  const commitDetails = await Promise.all(
    shaList.map(async (sha): Promise<CommitDetail | null> => {
      const { data: commitDetail }: { data: CommitDetailResponse } =
        await octokit.request(GITHUB_API.ENDPOINTS.COMMITS.DETAIL, {
          owner,
          repo: repositoryName,
          sha,
        });

      const filteredFiles = commitDetail.files?.filter(
        (file) => !shouldExcludeFile(file.filename, EXCLUDED_FILES_LIST),
      );

      if (!filteredFiles || filteredFiles.length === 0) {
        return null;
      }

      const files = filteredFiles.map(
        (file): CommitFile => ({
          filename: file.filename,
          status: file.status as CommitFile["status"],
          patch: file.patch ?? null,
        }),
      );

      return {
        sha,
        author: commitDetail.commit.author?.name || "Unknown",
        date: commitDetail.commit.author?.date || "",
        message: commitDetail.commit.message,
        files,
      } as CommitDetail;
    }),
  );

  return commitDetails.filter(
    (commit): commit is CommitDetail => commit !== null,
  );
};

export { getGithubCommitDetails };
