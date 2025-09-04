import { NextResponse } from "next/server";
import testCommits from "@/mocks/data/long-commit.json";
import getAnalysisResult from "@/services/analyze-commits/analyze-commits";
import { Commit } from "@/app/types/commit";

const testOpenAi = async function GET() {
  const commits: Commit[] = testCommits;
  const repositoryDescription =
    "이 리포지토리는 Next.js와 TypeScript 기반으로 만든 GitHub 커밋 분석 툴입니다. 사용자가 입력한 저장소 URL에서 브랜치와 커밋 내역을 가져와 AI로 분석하고, 분석 결과를 타임라인과 다이어그램으로 시각화해주는 것을 목표로 합니다.";
  const result = await getAnalysisResult(commits, repositoryDescription);

  return NextResponse.json({ result: result });
};

export { testOpenAi as GET };
