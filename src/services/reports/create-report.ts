import { getGithubCommitList } from "@/infra/integrations/github/commits/get-commit-list";
import { getGithubCommitDetails } from "@/infra/integrations/github/commits/get-commit-details";
import parseRepositoryUrl from "@/lib/parse-repository-url";
import getAnalysisResults from "../commit-analysis/analyze-commits";
import { z } from "zod";
import { analysisResultSchema } from "@/lib/validators/structured-analysis-result";

type AnalysisResult = z.infer<typeof analysisResultSchema>;

const createReport = async (
  reportTitle: string,
  repositoryOverview: string,
  repositoryUrl: string,
  branch: string,
): Promise<AnalysisResult> => {
  const { owner, repositoryName } = parseRepositoryUrl(repositoryUrl);

  const commitList = await getGithubCommitList(owner, repositoryName, branch);
  const shaList = commitList.map((commit) => commit.sha);

  const commitDetailsList = await getGithubCommitDetails(
    owner,
    repositoryName,
    shaList,
  );

  const commitAnalysisResults = await getAnalysisResults(
    commitDetailsList,
    repositoryOverview,
  );

  const commitsWithLink = commitAnalysisResults.commits.map((commit) => ({
    ...commit,
    commitLink: repositoryUrl.replace(/\/$/, "") + `/commit/${commit.commitId}`,
  }));

  return {
    ...commitAnalysisResults,
    reportTitle: reportTitle || commitAnalysisResults.reportTitle,
    repositoryUrl,
    branch,
    commits: commitsWithLink,
  };
};

export { createReport };
