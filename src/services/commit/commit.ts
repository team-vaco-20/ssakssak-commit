import { CommitDetail } from "@/app/types/githubCommit";
import { getCommits } from "@/infra/github-api/commits";

export const getAllCommits = async (
  owner: string,
  repositoryName: string,
  branch: string,
): Promise<CommitDetail[]> => {
  return await getCommits(owner, repositoryName, branch);
};
