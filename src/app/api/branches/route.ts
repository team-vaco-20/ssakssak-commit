import { getRepositoryBranches } from "@/services/branch/branch";
import { NextRequest, NextResponse } from "next/server";
import { validateRepositoryUrl } from "@/lib/validators/repository-url";
import AppError from "@/errors/app-error";
import { BranchName } from "@/app/types/branch";

const handleGetBranches = async function GET(
  request: NextRequest,
): Promise<NextResponse> {
  try {
    const repositoryUrl: string = validateRepositoryUrl(
      request.nextUrl.searchParams,
    );
    const branches: BranchName[] = await getRepositoryBranches(repositoryUrl);

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
};

export { handleGetBranches as GET };
