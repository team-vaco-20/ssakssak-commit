import { Octokit, RequestError } from "octokit";
import { Endpoints } from "@octokit/types";
import NotFoundError from "@/errors/not-found-error";
import { GITHUB_API } from "@/constants/github-api";

type ListCommitsResponse =
  Endpoints["GET /repos/{owner}/{repo}/commits"]["response"]["data"];

type SimpleCommit = {
  sha: string;
};

const getGithubCommitList = async (
  owner: string,
  repositoryName: string,
  branch: string,
): Promise<SimpleCommit[]> => {
  const octokit = new Octokit();
  let allCommits: SimpleCommit[] = [];
  let page = 1;
  let responseData: ListCommitsResponse = [];

  try {
    do {
      const response = await octokit.request(
        GITHUB_API.ENDPOINTS.COMMITS.LIST,
        {
          owner,
          repository: repositoryName,
          sha: branch,
          per_page: GITHUB_API.DEFAULTS.PER_PAGE,
          page,
        },
      );

      responseData = response.data;

      const commits = responseData.map((commit) => ({
        sha: commit.sha,
      }));

      allCommits = allCommits.concat(commits);
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

export { getGithubCommitList };
