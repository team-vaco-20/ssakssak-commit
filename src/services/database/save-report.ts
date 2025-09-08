import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { analysisResultSchema } from "@/lib/validators/structured-analysis-result";

const prisma = new PrismaClient();
type AnalysisResult = z.infer<typeof analysisResultSchema>;

async function saveAnalysisReport(data: AnalysisResult) {
  try {
    let finalReportTitle = data.reportTitle;
    const existingReports = await prisma.report.findMany({
      where: {
        reportTitle: {
          startsWith: data.reportTitle,
        },
      },
    });

    if (existingReports.length > 0) {
      const baseTitle = data.reportTitle.replace(/\s?\(\d+\)$/, "").trim();
      const newIndex = existingReports.length;
      finalReportTitle = `${baseTitle} (${newIndex})`;
    }

    const report = await prisma.report.create({
      data: {
        userId: data.userId || undefined,
        reportTitle: finalReportTitle,
        reportSummary: data.reportSummary,
        reportConclusion: data.reportConclusion,
        owner: data.owner,
        repositoryName: data.repositoryName,
        repositoryUrl: data.repositoryUrl,
        branch: data.branch,
        commits: data.commits,
      },
    });

    console.log("Report saved successfully:", report.reportId);
    return report;
  } catch (error) {
    console.error("Failed to save report:", error);
    throw new Error("Failed to save report to database.");
  }
}

export { saveAnalysisReport };
