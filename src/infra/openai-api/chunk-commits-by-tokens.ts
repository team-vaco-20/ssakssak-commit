import { Commit } from "@/app/types/commit";
import { AVERAGE_CHARS_PER_TOKEN } from "@/constants/open-ai";

const chunkCommitsByTokens = (
  commits: Commit[],
  maxTokensPerBatch: number,
): Commit[][] => {
  const batches: Commit[][] = [];
  let currentBatch: Commit[] = [];
  let currentBatchTokenCount = 0;

  for (const commit of commits) {
    const commitText = JSON.stringify(commit);
    const commitTokenCount = estimateTokenCount(commitText);

    if (commitTokenCount > maxTokensPerBatch) {
      if (currentBatch.length > 0) {
        batches.push(currentBatch);
        currentBatch = [];
        currentBatchTokenCount = 0;
      }
      batches.push([commit]);
      continue;
    }

    if (currentBatchTokenCount + commitTokenCount <= maxTokensPerBatch) {
      currentBatch.push(commit);
      currentBatchTokenCount += commitTokenCount;
    } else {
      batches.push(currentBatch);
      currentBatch = [commit];
      currentBatchTokenCount = commitTokenCount;
    }
  }

  if (currentBatch.length > 0) {
    batches.push(currentBatch);
  }

  return batches;
};

export default chunkCommitsByTokens;

function estimateTokenCount(text: string): number {
  const roughTokenCount = text.length / AVERAGE_CHARS_PER_TOKEN;
  const estimatedTokenCount = Math.ceil(roughTokenCount);

  return estimatedTokenCount;
}
