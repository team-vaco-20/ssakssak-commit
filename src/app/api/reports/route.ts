import { NextRequest, NextResponse } from "next/server";
import { createReport } from "@/services/reports/create-report";
import AppError from "@/errors/app-error";

async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { reportTitle, repositoryOverview, repositoryUrl } = body;

    const result = await createReport(
      reportTitle,
      repositoryOverview,
      repositoryUrl,
    );

    return NextResponse.json({ result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    const status = error instanceof AppError ? error.status : 500;

    return NextResponse.json({ error: { message, status } }, { status });
  }
}

export { POST };
