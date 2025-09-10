import { getGithubCommitList } from "@/infra/integrations/github/commits/get-commit-list";
import { getGithubCommitDetails } from "@/infra/integrations/github/commits/get-commit-details";
import parseRepositoryUrl from "@/lib/parse-repository-url";
import getAnalysisResults from "../commit-analysis/analyze-commits";
import { z } from "zod";
import { analysisResultSchema } from "@/lib/validators/structured-analysis-result";
type AnalysisResult = z.infer<typeof analysisResultSchema>;

type CreateReportParams = {
  accessToken?: string;
  reportTitle: string;
  repositoryUrl: string;
  branch: string;
  repositoryOverview: string;
};

const createReport = async ({
  reportTitle,
  repositoryUrl,
  branch,
  repositoryOverview,
  accessToken,
}: CreateReportParams): Promise<AnalysisResult> => {
  const { owner, repositoryName } = parseRepositoryUrl(repositoryUrl);

  const commitList = await getGithubCommitList(
    owner,
    repositoryName,
    branch,
    accessToken,
  );
  const shaList = commitList.map((commit) => commit.sha);

  const commitDetailsList = await getGithubCommitDetails(
    owner,
    repositoryName,
    shaList,
    accessToken,
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
