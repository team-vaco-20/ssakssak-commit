interface CommitFile {
  path: string;
  code: string;
  language: string;
  status: string;
  highlights: { startLine: number; endLine: number }[];
}

interface Analysis {
  type: "code-diff" | "diagram" | "explanation";
  title: string;
  description: string;
  files?: CommitFile[];
  caption?: string;
  diagram?: string;
  chart?: string;
}

interface CommitDetail {
  commitId: string;
  commitDate: string;
  commitMessage: string;
  author: string;
  changeSummary: string;
  analyses: Analysis[];
  commitConclusion: string;
}

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
}

export type {
  CommitFile,
  Analysis,
  CommitDetail,
  RequirementCheck,
  ReportData,
};
