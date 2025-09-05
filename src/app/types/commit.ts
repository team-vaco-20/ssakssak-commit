type FileStatus = "added" | "modified" | "deleted";

type DiagramType = "sequence" | "class" | "flowchart";

interface Highlight {
  startLine: number;
  endLine: number;
}

interface CommitFile {
  codeDiffSummary: string;
  code: string;
  language: string;
  filename: string;
  status: FileStatus;
  path: string;
  highlights: Highlight[];
}

interface Analysis {
  type: "code-diff" | "diagram" | "explanation";
  title: string;
  description: string;
  files?: CommitFile[];
  caption?: string;
  diagram?: DiagramType;
  chart?: string;
}

interface CommitDetail {
  commitId: string;
  commitDate: string;
  commitMessage: string;
  author: string;
  commitLink: string;
  changeSummary: string;
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
  repositoryUrl: string;
  branch: string;
}

export type {
  CommitFile,
  Analysis,
  CommitDetail,
  RequirementCheck,
  ReportData,
};
