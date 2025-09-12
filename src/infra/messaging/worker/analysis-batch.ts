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

export default analysisBatchWorker;
