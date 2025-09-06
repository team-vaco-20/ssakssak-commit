import { DeleteReportHistoryParams } from "@/app/types/report-history";
import { deleteReportHistory } from "@/repositories/report-history";

const removeReportHistory = async ({
  userId,
  reportHistoryId,
}: DeleteReportHistoryParams) => {
  await deleteReportHistory({ userId, reportHistoryId });
};

export default removeReportHistory;
