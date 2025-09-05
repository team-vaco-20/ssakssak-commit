import { NextRequest, NextResponse } from "next/server";
import { createReport } from "@/services/reports/create-report";
import AppError from "@/errors/app-error";

async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { reportTitle, repositoryOverview, repositoryUrl, branch } = body;

    const result = await createReport(
      reportTitle,
      repositoryOverview,
      repositoryUrl,
      branch,
    );

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    const status = error instanceof AppError ? error.status : 500;

    return NextResponse.json({ error: { message, status } }, { status });
  }
}

export { POST };
