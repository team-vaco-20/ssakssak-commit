type CommitInfo = {
  id: string;
  message: string;
};

type CommitFile = {
  filename: string;
  status: string;
  patch: string;
};

type Commit = {
  sha: string;
  author: string;
  date: string;
  message: string;
  files: CommitFile[];
};

export type { CommitInfo, CommitFile, Commit };
