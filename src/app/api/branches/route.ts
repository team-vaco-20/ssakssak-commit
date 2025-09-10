import { getBranchList } from "@/services/branch/get-branch-list";
import { NextRequest, NextResponse } from "next/server";
import { validateRepositoryUrl } from "@/lib/validators/repository-url";
import AppError from "@/errors/app-error";
import { BranchName } from "@/app/types/branch";
import { checkRateLimit } from "@/services/rate-limit/check-rate-limit";

async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const repositoryUrl: string = validateRepositoryUrl(
      request.nextUrl.searchParams,
    );

    const rateLimitResult = await checkRateLimit();

    if (!rateLimitResult.canProceed) {
      return NextResponse.json(
        {
          error: {
            message: rateLimitResult.message,
            status: 429,
          },
        },
        { status: 429 },
      );
    }

    const branches: BranchName[] = await getBranchList(repositoryUrl);

    return NextResponse.json({ branches });
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

export { GET };
