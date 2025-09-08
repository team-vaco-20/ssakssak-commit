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
  analyses: Analysis[];
  commitConclusion: string;
}

interface RequirementCheck {
  requirement: string;
  isSatisfied: boolean;
}

interface ReportData {
  reportId: string;
  owner: string;
  reportTitle: string;
  reportSummary: string;
  commits: CommitDetail[];
  reportConclusion: string;
  requirementsCheck: RequirementCheck[];
  repositoryUrl: string;
  repositoryName: string;
  branch: string;
}

interface GithubCommit {
  commitId: string;
  author: string;
  commitDate: string;
  commitMessage: string;
  files: CommitFile[];
}

export type {
  CommitFile,
  Analysis,
  CommitDetail,
  RequirementCheck,
  ReportData,
  GithubCommit,
};
