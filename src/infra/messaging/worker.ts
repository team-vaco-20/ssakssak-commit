import { Worker } from "bullmq";
import { getRedisSubscriber } from "../cache/redis-connection";
import { logger } from "@/lib/logger";

const connection = getRedisSubscriber();

const worker = new Worker(
  "reportCreation",
  async (job) => {
    logger.info(`[job ${job.id}] START -> name : ${job.name}`);
    try {
      const { createReport } = await import("@/services/reports/create-report");
      const result = await createReport({ ...job.data });
      logger.info(`[job ${job.id}] DONE`);

      return result;
    } catch (error) {
      logger.error(`[job ${job.id}] FAILED : ${error}`);
      throw error;
    }
  },
  { connection, concurrency: 3 },
);

worker.on("ready", () => {
  logger.info("Worker connected to Redis and ready!");
});

worker.on("completed", async (job) => {
  logger.info(`${job.id} has completed!`);
});

worker.on("failed", (job, err) => {
  logger.error({ jobId: job?.id, err }, "job failed");
});

export default worker;
