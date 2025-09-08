import {
  AUTH_ERROR_MESSAGES,
  SYSTEM_ERROR_MESSAGES,
} from "@/constants/error-messages";
import { AppError, UnauthorizedError } from "@/errors";
import authOptions from "@/lib/auth/auth-options";
import { getByReportId } from "@/repositories/report";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

async function GET({ params }: { params: { reportId: string } }) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.userId;

  if (!userId) {
    throw new UnauthorizedError({ message: AUTH_ERROR_MESSAGES.UNAUTHORIZED });
  }

  try {
    const report = await getByReportId(userId, params.reportId);

    return NextResponse.json({ status: "ok", report }, { status: 200 });
  } catch (error) {
    const message: string =
      error instanceof Error ? error.message : SYSTEM_ERROR_MESSAGES.UNEXPECTED;
    const status: number = error instanceof AppError ? error.status : 500;

    return NextResponse.json(
      {
        error: { message, status },
      },
      { status },
    );
  }
}

export { GET };
