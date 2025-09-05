import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth/auth-options";
import getReportHistoryList from "@/services/report-history/get-report-history-list";
import { AppError, UnauthorizedError } from "@/errors";

async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.userId) {
    throw new UnauthorizedError({
      message:
        "세션이 만료되었거나 올바르지 않습니다. 로그인 후 이용해 주세요.",
    });
  }

  const userId = session?.user.userId;

  try {
    const result = await getReportHistoryList(userId);

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected Error";
    const status = error instanceof AppError ? error.status : 500;

    return NextResponse.json({ error: { message, status } }, { status });
  }
}

export { GET };
