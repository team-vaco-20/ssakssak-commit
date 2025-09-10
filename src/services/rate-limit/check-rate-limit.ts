import { RateLimitCheckResult } from "@/app/types/rate-limit";
import { RATE_LIMIT_CONFIG } from "@/constants/rate-limit";
import { RATE_LIMIT_MESSAGES } from "@/constants/error-messages";
import { formatUnixToKoreanTime } from "@/lib/util/time-formatter";
import { getRateLimitInfo } from "@/infra/github-api/rate-limit/get-rate-limit";

const checkRateLimit = async (): Promise<RateLimitCheckResult> => {
  try {
    const rateLimitInfo = await getRateLimitInfo();

    const resetTime = formatUnixToKoreanTime(rateLimitInfo.reset);
    const canProceed =
      rateLimitInfo.remaining > RATE_LIMIT_CONFIG.MINIMUM_REQUESTS;

    if (!canProceed) {
      return {
        canProceed: false,
        remaining: rateLimitInfo.remaining,
        resetTime,
        message: RATE_LIMIT_MESSAGES.INSUFFICIENT_REQUESTS.replace(
          "{resetTime}",
          resetTime,
        ),
      };
    }

    return {
      canProceed: true,
      remaining: rateLimitInfo.remaining,
      resetTime,
    };
  } catch (error) {
    throw error;
  }
};

export { checkRateLimit };
