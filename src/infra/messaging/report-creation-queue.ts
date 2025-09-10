import "server-only";
import { Queue } from "bullmq";
import { getRedisClient } from "../cache/redis-connection";

const connection = getRedisClient();
const reportCreationQueue = new Queue("reportCreation", { connection });

const addJobs = async (data: unknown) => {
  return await reportCreationQueue.add("createReportJob", data, {
    removeOnComplete: {
      age: 3600,
      count: 1000,
    },
    removeOnFail: {
      age: 24 * 3600,
    },
  });
};

export { addJobs };
