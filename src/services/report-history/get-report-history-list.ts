import { findReportHistoriesByUser } from "@/repositories/report-hisotry";

const getReportHistoryList = async (userId: string) => {
  const reportHistoryList = await findReportHistoriesByUser(userId);

  return reportHistoryList;
};

export default getReportHistoryList;
