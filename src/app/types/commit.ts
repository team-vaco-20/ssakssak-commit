type CommitInfo = {
  id: string;
  message: string;
};

interface CommitFile {
  filename: string;
  status: string;
  patch: string | null;
}

interface CommitDetail {
  sha: string;
  author: string;
  date: string;
  message: string;
  files: CommitFile[] | null;
}

export type { CommitInfo, CommitFile, CommitDetail };
