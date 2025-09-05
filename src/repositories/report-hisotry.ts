import prisma from "@/lib/prisma";

const findRepoHistoriesByUser = async (userId: string) => {
  return await prisma.reportHistory.findMany({
    where: {
      userId: userId,
      isActive: true,
    },
    select: {
      reportHistoryId: true,
      reportHistoryTitle: true,
      repositoryOverview: true,
      repositoryUrl: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
};

export { findRepoHistoriesByUser };
