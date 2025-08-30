import { BranchName } from "@/app/types/branch";
import { getBranches } from "@/infra/github-api/github";
import parseRepositoryUrl from "@/lib/parse-repository-url";

const getRepositoryBranches = async (
  repositoryUrl: string,
): Promise<BranchName[]> => {
  const { owner, repositoryName } = parseRepositoryUrl(repositoryUrl);
  const branches: BranchName[] = await getBranches(owner, repositoryName);

  return branches;
};

export { getRepositoryBranches };
