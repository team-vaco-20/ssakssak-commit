import { NextRequest, NextResponse } from "next/server";
import { createReport } from "@/services/reports/create-report";
import { validateReportInput } from "@/lib/validators/report-fields";
import AppError from "@/errors/app-error";

async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();

    const validatedInput = validateReportInput(body);

    const result = await createReport(
      validatedInput.reportTitle,
      validatedInput.repositoryOverview,
      validatedInput.repositoryUrl,
      validatedInput.branch,
    );

    return NextResponse.json({ result }, { status: 200 });
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
