import { NextRequest, NextResponse } from "next/server";
import { getAllCommits } from "@/services/commit/commit";
import AppError from "@/errors/app-error";
import { GITHUB_API } from "@/constants/github-api";

async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const owner = body.owner || GITHUB_API.DEFAULTS.DEFAULT_OWNER;
    const repositoryName = body.repo || GITHUB_API.DEFAULTS.DEFAULT_REPO;
    const branch = body.branch || GITHUB_API.DEFAULTS.DEFAULT_BRANCH;

    const commits = await getAllCommits(owner, repositoryName, branch);
    return NextResponse.json(commits);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    const status = error instanceof AppError ? error.status : 500;

    return NextResponse.json({ error: { message, status } }, { status });
  }
}

export { POST };
