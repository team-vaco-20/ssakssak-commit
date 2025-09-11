type Phase = "collecting" | "analyzing" | "visualizing";

interface ReportJobData {
  status: "completed" | "failed";
  reportKey?: string;
  phase: Phase;
}

export type { Phase, ReportJobData };
