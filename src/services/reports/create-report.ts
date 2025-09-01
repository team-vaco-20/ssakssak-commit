import { CommitDetail } from "@/app/types/commit";
import { getGithubCommitList } from "@/infra/github-api/commits/get-commit-list";
import { getGithubCommitDetails } from "@/infra/github-api/commits/get-commit-details";

const createReport = async (
  owner: string,
  repositoryName: string,
  branch: string,
): Promise<CommitDetail[]> => {
  const commits = await getGithubCommitList(owner, repositoryName, branch);

  const shas = commits.map((commit) => commit.sha);

  const commitDetails = await getGithubCommitDetails(
    owner,
    repositoryName,
    shas,
  );

  return commitDetails;
};

export { createReport };
