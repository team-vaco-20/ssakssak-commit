import { Octokit } from "octokit";
import { BranchName } from "@/app/types/branch";

const getBranchNames = async (owner: string, repositoryName: string) => {
  const octokit = new Octokit();
  const response = await octokit.request("GET /repos/{owner}/{repo}/branches", {
    owner: owner,
    repo: repositoryName,
    headers: {
      "X-Github-Api-Version": "2022-11-28",
    },
  });

  const branchNames: BranchName[] = response.data.map((branch) => branch.name);

  return branchNames;
};

export { getBranchNames };
