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
  path: string;
  code: string;
  language: string;
  highlights: Highlight[];
  status: FileStatus;
}

interface AnalysisData {
  files: FileData[];
}

interface MonacoFileViewerProps {
  filename: string;
  fileStatus: FileStatus;
  code: string;
  language: string;
  highlights: Highlight[];
  readonly?: boolean;
}

export type {
  FileStatus,
  Highlight,
  FileData,
  AnalysisData,
  MonacoFileViewerProps,
};
