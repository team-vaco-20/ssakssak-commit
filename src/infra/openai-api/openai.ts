import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import {
  analysisReportSchema,
  commitAnalysesSchema,
} from "@/lib/validators/structured-analysis-result";
import { Commit } from "@/app/types/commit";
import {
  COMMIT_ANALYSIS_INSTRUCTIONS,
  REPORT_ANALYSIS_INSTRUCTIONS,
} from "./instructions";
import { OPENAI_MODEL, TOKEN_LIMITS } from "@/constants/open-ai";

const client = new OpenAI();
const INPUT_TEXT_CONTENT_TYPE = "input_text";

const analyzeCommitBatch = async (
  batch: Commit[],
  repositoryDescription: string | undefined,
) => {
  const inputContent: { type: "input_text"; text: string }[] = [
    {
      type: INPUT_TEXT_CONTENT_TYPE,
      text: "아래 커밋 JSON을 빠짐없이 위 지침과 스키마에 맞춰 분석",
    },
    { type: INPUT_TEXT_CONTENT_TYPE, text: JSON.stringify(batch) },
  ];

  if (repositoryDescription) {
    inputContent.push({
      type: INPUT_TEXT_CONTENT_TYPE,
      text: `리포지토리 설명(참고용): ${repositoryDescription}`,
    });
  }

  const result = await client.responses.create({
    model: OPENAI_MODEL,
    max_output_tokens: TOKEN_LIMITS.MAX_OUTPUT_TOKENS,
    instructions: COMMIT_ANALYSIS_INSTRUCTIONS,
    input: [
      {
        role: "user",
        content: inputContent,
      },
    ],
    text: {
      format: zodTextFormat(commitAnalysesSchema, "commitAnalysesSchemaResult"),
    },
  });

  return JSON.parse(result.output_text);
};

const evaluateCommitSummaries = async (
  extractedCommitSummaries: {
    commitId: string;
    changeSummary: string;
    commitConclusion: string;
  }[],
) => {
  const result = await client.responses.create({
    model: "gpt-4o-mini",
    max_output_tokens: 2000,
    instructions: REPORT_ANALYSIS_INSTRUCTIONS,
    input: [
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: "아래 커밋 분석 결과 추출 JSON을 빠짐없이 위 지침과 스키마에 맞춰 분석",
          },
          {
            type: "input_text",
            text: JSON.stringify(extractedCommitSummaries),
          },
        ],
      },
    ],
    text: {
      format: zodTextFormat(analysisReportSchema, "analysis_result"),
    },
  });

  return JSON.parse(result.output_text);
};

export { analyzeCommitBatch, evaluateCommitSummaries };
