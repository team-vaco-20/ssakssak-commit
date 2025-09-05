import { findRepoHistoriesByUser } from "@/repositories/report-hisotry";

const getReportHistoryList = async (userId: string) => {
  const reportHistoryList = await findRepoHistoriesByUser(userId);

  return reportHistoryList;
};

export default getReportHistoryList;
