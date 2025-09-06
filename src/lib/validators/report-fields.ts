import { z } from "zod";
import BadRequestError from "@/errors/bad-request-error";
import generateErrorMessage from "./generate-error-message";

const reportInputSchema = z.strictObject({
  reportTitle: z
    .string()
    .max(20, "리포트 제목은 최대 20자까지 가능합니다.")
    .refine((val) => !val || val.trim().length > 0, {
      message: "공백만 입력할 수 없습니다.",
    })
    .optional()
    .default(""),

  repositoryOverview: z
    .string()
    .max(1000, "리포지토리 개요는 최대 1000자까지 가능합니다.")
    .refine((val) => !val || val.trim().length > 0, {
      message: "공백만 입력할 수 없습니다.",
    })
    .optional()
    .default(""),

  repositoryUrl: z
    .string({
      required_error: "repositoryUrl은 필수 항목입니다.",
      invalid_type_error: "repositoryUrl은 문자열이어야 합니다.",
    })
    .trim()
    .url("올바른 URL 형태가 아닙니다.")
    .refine(
      (url) => /^https:\/\/(www\.)?github\.com\/[\w.-]+\/[\w.-]+\/?$/.test(url),
      {
        message:
          "유효한 Github 레포지토리 URL 형식이 아닙니다. 예: https://github.com/owner/repo",
      },
    ),

  branch: z.string({
    required_error: "branch는 필수 항목입니다.",
    invalid_type_error: "branch는 문자열이어야 합니다.",
  }),
});

type ValidatedReportInput = z.infer<typeof reportInputSchema>;

const validateReportInput = (input: unknown): ValidatedReportInput => {
  try {
    const validatedInput = reportInputSchema.parse(input);
    return validatedInput;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const message: string = generateErrorMessage(error);

      throw new BadRequestError({
        message: message,
      });
    }
    throw error;
  }
};

export { validateReportInput };
export type { ValidatedReportInput };
