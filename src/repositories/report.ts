import prisma from "@/lib/prisma";

type DeleteManyArgs = {
  userId: string;
  reportIds: string[];
};

async function getReports(userId: string) {
  return prisma.report.findMany({
    where: { userId, isActive: true },
    orderBy: { createdAt: "desc" },
    select: {
      reportId: true,
      reportTitle: true,
      repositoryName: true,
      owner: true,
      branch: true,
      createdAt: true,
    },
  });
}

async function deleteReports({ userId, reportIds }: DeleteManyArgs) {
  const result = await prisma.report.updateMany({
    where: { userId, isActive: true, reportId: { in: reportIds } },
    data: { isActive: false },
  });

  return result;
}

export { getReports, deleteReports };
