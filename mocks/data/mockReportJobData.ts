import type { ReportJobData } from "@/types/sse";

const mockReportJobData: ReportJobData[] = [
  {
    status: "completed",
    phase: "collecting",
    reportKey: undefined,
  },
  {
    status: "completed",
    phase: "analyzing",
    reportKey: undefined,
  },
  {
    status: "completed",
    phase: "visualizing",
    reportKey: "abc123",
  },
];

export { mockReportJobData };
