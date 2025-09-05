import { useContext } from "react";
import { PROVIDER_MESSAGES } from "@/constants/error-messages";
import { ReportHistoryContext } from "@/stores/report-history/report-history-provider";

const useReportHistory = () => {
  const context = useContext(ReportHistoryContext);
  if (!context) {
    throw new Error(PROVIDER_MESSAGES.CONTEXT_OUTSIDE_PROVIDER);
  }
  return context;
};

export { useReportHistory };
