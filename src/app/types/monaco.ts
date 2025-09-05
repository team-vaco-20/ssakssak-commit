type FileStatus =
  | "added"
  | "modified"
  | "deleted"
  | "removed"
  | "renamed"
  | "copied";

interface Highlight {
  startLine: number;
  endLine: number;
  reason: string;
}

interface FileData {
  commitId: string;
  path: string;
  code: string;
  language: string;
  highlights: Highlight[];
  status: FileStatus;
}

interface AnalysisData {
  files: FileData[];
}

interface MonacoFileBaseProps {
  code: string;
  highlights: Highlight[];
  fileStatus: FileStatus;
}

interface MonacoFileViewerProps extends MonacoFileBaseProps {
  filename: string;
  language: string;
  readOnly?: boolean;
}

export type {
  FileStatus,
  Highlight,
  FileData,
  AnalysisData,
  MonacoFileViewerProps,
  MonacoFileBaseProps,
};
