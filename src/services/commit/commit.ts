import { CommitDetail } from "@/app/types/commit";
import { getCommits } from "@/infra/github-api/commits";

const getAllCommits = async (
  owner: string,
  repositoryName: string,
  branch: string,
): Promise<CommitDetail[]> => {
  return await getCommits(owner, repositoryName, branch);
};

export { getAllCommits };
