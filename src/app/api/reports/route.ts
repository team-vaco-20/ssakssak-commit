import { NextRequest, NextResponse } from "next/server";
import { validateReportInput } from "@/lib/validators/report-fields";
import AppError from "@/errors/app-error";
import { addReportCreationJob } from "@/infra/messaging/queue";
import getAccessToken from "@/lib/auth/get-access-token";

async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const validatedResult = validateReportInput(body);
    const accessToken = await getAccessToken();

    const job = await addReportCreationJob({ ...validatedResult, accessToken });

    return NextResponse.json(
      { status: "queued", jobId: job.id },
      { status: 202, headers: { Location: `/api/report-jobs/${job.id}` } },
    );
  } catch (error) {
    const message: string =
      error instanceof Error ? error.message : "Unexpected error";
    const status: number = error instanceof AppError ? error.status : 500;

    return NextResponse.json(
      {
        error: { message, status },
      },
      { status },
    );
  }
}

export { POST };
