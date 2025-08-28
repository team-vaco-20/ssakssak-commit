import { getRepositoryBranchNames } from "@/services/branch/branch";
import { NextRequest, NextResponse } from "next/server";

const handleGetBranchNames = async function GET(request: NextRequest) {
  const repositoryUrl = request.nextUrl.searchParams.get("repositoryUrl");

  if (repositoryUrl === null) {
    return;
  }

  try {
    const branches = await getRepositoryBranchNames(repositoryUrl);

    return NextResponse.json({ branches });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";

    return new Response(message, { status: 500 });
  }
};

export { handleGetBranchNames as GET };
