import { useState } from "react";
import { RateLimitCheckResult } from "@/app/types/rate-limit";
import { SYSTEM_ERROR_MESSAGES } from "@/constants/error-messages";

const useRateLimit = () => {
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkRateLimit = async (
    repositoryUrl: string,
  ): Promise<RateLimitCheckResult | null> => {
    setError(null);
    setIsChecking(true);

    try {
      const response = await fetch(
        `/api/rate-limit?repositoryUrl=${encodeURIComponent(repositoryUrl)}`,
      );
      const data = await response.json();

      if (!response.ok) {
        const errorMessage =
          data?.error?.message ?? SYSTEM_ERROR_MESSAGES.SERVER;
        setError(errorMessage);
        return null;
      }

      return data.rateLimitResult;
    } catch {
      setError(SYSTEM_ERROR_MESSAGES.NETWORK);
      return null;
    } finally {
      setIsChecking(false);
    }
  };

  return {
    checkRateLimit,
    isChecking,
    error,
  };
};

export { useRateLimit };
