import { NextResponse } from "next/server";
import testCommits from "@/mocks/data/long-commit.json";
import getAnalysisResult from "@/services/analyze-commits";
import { Commit } from "@/app/types/commit";

const testOpenAi = async function GET() {
  const commits: Commit[] = testCommits;
  const repositoryDescription = "";
  const result = await getAnalysisResult(commits, repositoryDescription);

  return NextResponse.json({ result: result });
};

export { testOpenAi as GET };
