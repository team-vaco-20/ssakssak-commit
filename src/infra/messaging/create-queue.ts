import { JobsOptions, Queue } from "bullmq";
import { getRedisClient } from "../cache/redis-connection";

const connection = getRedisClient();

type QueueCreationParams = {
  queueName: string;
  jobName: string;
  options: JobsOptions;
};

const createQueue = ({ queueName, jobName, options }: QueueCreationParams) => {
  const queue = new Queue(queueName, { connection });

  const addJob = async (data: unknown) => {
    return await queue.add(jobName, data, {
      ...options,
    });
  };

  return { queue, addJob };
};

export default createQueue;
