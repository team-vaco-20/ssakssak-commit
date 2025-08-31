import { NextRequest, NextResponse } from "next/server";
import { getAllCommits } from "@/services/commit/commit";
import AppError from "@/errors/app-error";

async function GET(req: NextRequest) {
  try {
    const url = req.nextUrl;
    const owner = url.searchParams.get("owner") || "defaultOwner";
    const repositoryName = url.searchParams.get("repo") || "defaultRepo";
    const branch = url.searchParams.get("branch") || "main";

    const commits = await getAllCommits(owner, repositoryName, branch);
    return NextResponse.json(commits);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    const status = error instanceof AppError ? error.status : 500;

    return NextResponse.json({ error: { message, status } }, { status });
  }
}

export { GET };
