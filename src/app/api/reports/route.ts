import { NextRequest, NextResponse } from "next/server";
import { createReport } from "@/services/reports/create-report";
import { validateReportInput } from "@/lib/validators/report-fields";
import AppError from "@/errors/app-error";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth/auth-options";
import { deleteReports } from "@/repositories/reports";
import { UnauthorizedError } from "@/errors";
import { AUTH_ERROR_MESSAGES } from "@/constants/error-messages";

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

    return NextResponse.json({ result }, { status: 201 });
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

async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.userId;

  if (!userId) {
    throw new UnauthorizedError({ message: AUTH_ERROR_MESSAGES.UNAUTHORIZED });
  }

  try {
    const body = await request.json();
    const reportIds = body.reportIds;

    const deleted = await deleteReports({ userId, reportIds: reportIds });

    return NextResponse.json({ status: "ok", deleted }, { status: 200 });
  } catch (error) {
    const message: string =
      error instanceof Error ? error.message : "Unexpected Error";
    const status: number = error instanceof AppError ? error.status : 500;
    return NextResponse.json(
      {
        error: { message, status },
      },
      { status },
    );
  }
}

export { POST, DELETE };
