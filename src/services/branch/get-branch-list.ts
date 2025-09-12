import { BranchName } from "@/types/branch";
import { getGithubBranchList } from "@/infra/integrations/github/branches/get-branch-list";
import parseRepositoryUrl from "@/lib/parse-repository-url";

const getBranchList = async (repositoryUrl: string): Promise<BranchName[]> => {
  const { owner, repositoryName } = parseRepositoryUrl(repositoryUrl);
  const branches: BranchName[] = await getGithubBranchList(
    owner,
    repositoryName,
  );

  return branches;
};

export { getBranchList };
