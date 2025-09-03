import { Commit } from "@/app/types/commit";
import { MAX_TOKENS_PER_BATCH } from "@/constants/open-ai";
import chunkCommitsByTokens from "@/infra/openai-api/chunk-commits-by-tokens";
import {
  analyzeCommitBatch,
  evaluateCommitSummaries,
} from "@/infra/openai-api/openai";
import {
  analyzedCommitSchema,
  commitAnalysesSchema,
} from "@/lib/validators/structured-analysis-result";
import { z } from "zod";

type AnalyzedCommitSchema = z.infer<typeof analyzedCommitSchema>;
type CommitAnalysesSchema = z.infer<typeof commitAnalysesSchema>;

const getAnalysisResult = async (
  commits: Commit[],
  repositoryDescription: string | undefined,
) => {
  const commitBatches = chunkCommitsByTokens(commits, MAX_TOKENS_PER_BATCH);
  const resultPerBatch = await Promise.all(
    commitBatches.map((batch) =>
      analyzeCommitBatch(batch, repositoryDescription),
    ),
  );

  const mergedResults = resultPerBatch.flatMap((result) => result.commits);
  const sortedMergedResults = sortMergedResultsByCommitDate(mergedResults);

  const extractedCommitSummaries = extractCommitSummaries(sortedMergedResults);
  const overallResult = await evaluateCommitSummaries(extractedCommitSummaries);

  return { ...overallResult, ...sortedMergedResults };
};

const sortMergedResultsByCommitDate = (
  merged: AnalyzedCommitSchema[],
): CommitAnalysesSchema => {
  const sortedList = [...merged].sort((a, b) => {
    const ta = new Date(a.commitDate).getTime();
    const tb = new Date(b.commitDate).getTime();
    if (ta !== tb) {
      return ta - tb;
    }
    return a.commitId.localeCompare(b.commitId);
  });

  return { commits: sortedList };
};

const extractCommitSummaries = (sortedList: CommitAnalysesSchema) => {
  const extractedSummaries = sortedList.commits.map((data) => ({
    commitId: data.commitId,
    changeSummary: data.changeSummary,
    commitConclusion: data.commitConclusion,
  }));

  return extractedSummaries;
};

export default getAnalysisResult;
