import { getBranchNames } from "@/infra/github-api/github";
import parseRepositoryUrl from "@/lib/parse-repository-url";

const getRepositoryBranchNames = async (repositoryUrl: string) => {
  const { owner, repositoryName } = parseRepositoryUrl(repositoryUrl);
  const branchNames = await getBranchNames(owner, repositoryName);

  return branchNames;
};

export { getRepositoryBranchNames };
