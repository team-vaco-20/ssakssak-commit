import { Octokit, RequestError } from "octokit";
import { Endpoints } from "@octokit/types";
import NotFoundError from "@/errors/not-found-error";
import { GITHUB_API } from "@/constants/github-api";
import { GITHUB_REPOSITORY_ERROR_MESSAGES } from "@/constants/error-messages";

type ListCommitsResponse =
  Endpoints["GET /repos/{owner}/{repo}/commits"]["response"]["data"];

type SimpleCommit = {
  sha: string;
  date: string;
};

const getGithubCommitList = async (
  owner: string,
  repositoryName: string,
  branch: string,
): Promise<SimpleCommit[]> => {
  const octokit = new Octokit();

  try {
    const allCommits = await getAllCommits(
      octokit,
      owner,
      repositoryName,
      branch,
    );

    if (branch === "main" || branch === "master" || allCommits.length <= 10) {
      return allCommits;
    }

    return filterBranchSpecificCommits(
      allCommits,
      owner,
      repositoryName,
      octokit,
    );
  } catch (error) {
    if (error instanceof RequestError && error.status === 404) {
      throw new NotFoundError({
        message: GITHUB_REPOSITORY_ERROR_MESSAGES.NOT_FOUND,
      });
    }
    throw error;
  }
};

const filterBranchSpecificCommits = async (
  commits: SimpleCommit[],
  owner: string,
  repositoryName: string,
  octokit: Octokit,
): Promise<SimpleCommit[]> => {
  if (commits.length === 0) return commits;

  const { data: repoData } = await octokit.request(
    "GET /repos/{owner}/{repo}",
    {
      owner,
      repo: repositoryName,
    },
  );

  const { data: latestMainCommit } = await octokit.request(
    "GET /repos/{owner}/{repo}/commits/{ref}",
    {
      owner,
      repo: repositoryName,
      ref: repoData.default_branch,
    },
  );

  const mainBranchLatestDate = new Date(
    latestMainCommit.commit.author?.date || "",
  );

  const branchSpecificCommits = commits.filter((commit) => {
    const commitDate = new Date(commit.date);
    return commitDate > mainBranchLatestDate;
  });

  if (branchSpecificCommits.length === 0) {
    return commits.slice(-10);
  }

  return branchSpecificCommits;
};

const getAllCommits = async (
  octokit: Octokit,
  owner: string,
  repositoryName: string,
  branch: string,
): Promise<SimpleCommit[]> => {
  let allCommits: SimpleCommit[] = [];
  let page = 1;
  let responseData: ListCommitsResponse = [];
  let pagesRemaining = true;

  while (pagesRemaining) {
    const response = await octokit.request(GITHUB_API.ENDPOINTS.COMMITS.LIST, {
      owner,
      repo: repositoryName,
      sha: branch,
      per_page: GITHUB_API.DEFAULTS.PER_PAGE,
      page,
      sort: "author-date",
      direction: "asc",
    });

    responseData = response.data;

    if (responseData.length === 0) {
      pagesRemaining = false;
    } else {
      const commits = responseData.map((commit) => ({
        sha: commit.sha,
        date: commit.commit.author?.date || "",
      }));
      allCommits = allCommits.concat(commits);
      page += 1;
    }
  }

  allCommits.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  return allCommits;
};

export { getGithubCommitList };
