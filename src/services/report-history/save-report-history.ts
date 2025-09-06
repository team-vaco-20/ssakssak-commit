import {
  createReportHistory,
  updateReportHistory,
} from "@/repositories/report-hisotry";
import { SaveReportHistoryParams } from "@/app/types/report-history";

const saveReportHistory = async (params: SaveReportHistoryParams) => {
  if ("reportHistoryId" in params) {
    return await updateReportHistory(params);
  }

  createReportHistory(params);
};

export default saveReportHistory;
