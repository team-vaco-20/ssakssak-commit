import { AppError, NotFoundError } from "@/errors";
import { getRedisClient } from "@/infra/cache/redis-connection";
import { Queue } from "bullmq";
import { NextRequest, NextResponse } from "next/server";
import { JOB_STATUS, JOB_QUEUE } from "@/constants/job";
import { JOB_ERROR_MESSAGES } from "@/constants/error-messages";

const { COMPLETED, FAILED, PROCESSING, ERROR } = JOB_STATUS;
const { JOB_ID_REQUIRED, NOT_FOUND } = JOB_ERROR_MESSAGES;

async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ jobId: string }> },
) {
  const { jobId } = await params;

  if (!jobId) {
    return NextResponse.json(
      { status: 400, message: JOB_ID_REQUIRED },
      { status: 400 },
    );
  }

  try {
    const connection = getRedisClient();
    const queue = new Queue(JOB_QUEUE.REPORT_CREATION, { connection });
    const job = await queue.getJob(jobId);

    if (!job) {
      throw new NotFoundError({
        message: NOT_FOUND,
      });
    }

    const state = await job.getState();
    if (state === COMPLETED) {
      const returnValue = job.returnvalue as { reportKey?: string } | null;
      if (returnValue?.reportKey) {
        return NextResponse.json(
          { status: COMPLETED, reportKey: returnValue.reportKey },
          { status: 200 },
        );
      }
      return NextResponse.json({ status: PROCESSING }, { status: 200 });
    }

    if (state === FAILED) {
      const reason = job.failedReason || "unknown";
      return NextResponse.json({ status: FAILED, reason }, { status: 200 });
    }

    return NextResponse.json({ status: PROCESSING }, { status: 200 });
  } catch (error) {
    const message: string =
      error instanceof Error ? error.message : "Unexpected error";
    const status: number = error instanceof AppError ? error.status : 500;

    return NextResponse.json(
      {
        status: ERROR,
        message: message,
      },
      { status },
    );
  }
}

export { GET };
