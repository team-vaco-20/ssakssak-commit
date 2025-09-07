import { CommitDetail } from "./commit";

interface RequirementCheck {
  requirement: string;
  isSatisfied: boolean;
}

interface ReportData {
  reportId: string;
  reportTitle: string;
  reportSummary: string;
  commits: CommitDetail[];
  reportConclusion: string;
  requirementsCheck: RequirementCheck[];
  repositoryUrl: string;
  branch: string;
}

export type { RequirementCheck, ReportData };
