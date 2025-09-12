import { JOB_QUEUE } from "@/constants/report-job";
import { getRedisSubscriber } from "@/infra/cache/redis-connection";
import { logger } from "@/lib/logger";
import { Job, Worker } from "bullmq";

const connection = getRedisSubscriber();

const analysisBatchWorker = new Worker(
  JOB_QUEUE.ANALYSIS_BATCH,
  async (job: Job) => {
    logger.info(`[analysis-batch-job ${job.id}] START -> name : ${job.name}`);
  },
  { connection, concurrency: 5 },
);

analysisBatchWorker.on("ready", () => {
  logger.info("[analysisBatch] Worker connected to Redis and ready!");
});

analysisBatchWorker.on("completed", async (job) => {
  logger.info(`[analysisBatch] ${job.id} has completed!`);
});

analysisBatchWorker.on("error", (error) => {
  logger.error({ error }, "[analysisBatch] error occured!");
});

analysisBatchWorker.on("failed", (job, error) => {
  logger.error({ jobId: job?.id, error }, "[analysisBatch] job failed");
});

export default analysisBatchWorker;
