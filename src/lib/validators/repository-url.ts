import { z } from "zod";
import BadRequestError from "@/errors/bad-request-error";
import { GITHUB_REPOSITORY_ERROR_MESSAGES } from "@/constants/error-messages";
import { GITHUB_REPOSITORY_RULES } from "@/constants/validations";
import generateErrorMessage from "./generate-error-message";

const { INVALID_URL, INVALID_REPO_PATH } = GITHUB_REPOSITORY_ERROR_MESSAGES;

const { URL_SEGMENT_COUNT, HOSTNAME_REGEX, URL_PREFIX, SUFFIX_REGEX } =
  GITHUB_REPOSITORY_RULES;

const repositoryUrlSchema = z.strictObject({
  repositoryUrl: z
    .url({
      hostname: HOSTNAME_REGEX,
      error: INVALID_URL,
    })
    .refine(
      (value) => {
        const repositoryUrlSegmentCount: number = value
          .replace(URL_PREFIX, "")
          .replace(SUFFIX_REGEX, "")
          .split("/").length;
        return repositoryUrlSegmentCount === URL_SEGMENT_COUNT;
      },
      {
        error: INVALID_REPO_PATH,
      },
    ),
});

const validateRepositoryUrl = (searchParams: URLSearchParams): string => {
  try {
    const validatedRepositoryUrl = repositoryUrlSchema.parse(
      Object.fromEntries(searchParams),
    ).repositoryUrl;
    return validatedRepositoryUrl;
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

export { validateRepositoryUrl };
