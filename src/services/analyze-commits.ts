import { Commit } from "@/app/types/commit";
import { TOKEN_LIMITS } from "@/constants/open-ai";
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
import { logger } from "@/lib/logger";

type AnalyzedCommitSchema = z.infer<typeof analyzedCommitSchema>;
type CommitAnalysesSchema = z.infer<typeof commitAnalysesSchema>;

const getAnalysisResult = async (
  commits: Commit[],
  repositoryDescription: string | undefined,
) => {
  const commitBatches = chunkCommitsByTokens(
    commits,
    TOKEN_LIMITS.MAX_TOKENS_PER_BATCH,
  );
  const resultPerBatch = await processCommitBatches(
    commitBatches,
    repositoryDescription,
  );

  const mergedResults = resultPerBatch.flatMap((result) => result.commits);
  logger.info(
    { mergedCount: mergedResults.length },
    `배치 결과 병합 완료: 총 ${mergedResults.length}개 커밋`,
  );

  const sortedMergedResults = sortMergedResultsByCommitDate(mergedResults);
  logger.info(
    {
      firstCommit: sortedMergedResults.commits[0]?.commitDate,
      lastCommit: sortedMergedResults.commits.at(-1)?.commitDate,
    },
    "커밋들을 시간순으로 정렬 완료",
  );

  const extractedCommitSummaries = extractCommitSummaries(sortedMergedResults);
  const overallResult = await evaluateCommitSummaries(extractedCommitSummaries);

  logger.info(
    {
      title: overallResult.title,
    },
    `전체 리포트 생성 완료: "${overallResult.reportTitle}"`,
  );

  return { ...overallResult, ...sortedMergedResults };
};

const processCommitBatches = async (
  commitBatches: Commit[][],
  repositoryDescription?: string,
) => {
  return Promise.all(
    commitBatches.map(async (batch, index) => {
      logger.info(
        { batchIndex: index, commitCount: batch.length },
        `배치 ${index + 1}/${commitBatches.length} 분석 시작`,
      );

      const result = await analyzeCommitBatch(batch, repositoryDescription);

      logger.info(
        { batchIndex: index, commitCount: batch.length },
        `배치 ${index + 1}/${commitBatches.length} 분석 완료`,
      );

      return result;
    }),
  );
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
