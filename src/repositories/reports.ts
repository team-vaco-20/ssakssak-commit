import prisma from "@/lib/prisma";

type DeleteManyArgs = {
  userId: string;
  reportIds: string[];
};

export async function deleteReports({ userId, reportIds }: DeleteManyArgs) {
  const result = await prisma.report.updateMany({
    where: { userId, isActive: true, reportId: { in: reportIds } },
    data: { isActive: false },
  });

  return result;
}
