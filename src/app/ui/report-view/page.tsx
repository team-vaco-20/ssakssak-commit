"use client";

import { MonacoDiffViewer } from "@/app/ui/report-view/monaco/MonacoDiffViewer";
import rawMonacoData from "@/mocks/data/monaco.json";

interface File {
  filename: string;
  status: "added" | "modified" | "removed" | "deleted";
  patch: string | null;
}

interface Commit {
  sha: string;
  author: string;
  date: string;
  message: string;
  files: File[];
}

const monacoData = rawMonacoData as Commit[];

const getLanguageFromFilename = (filename: string): string => {
  const extension = filename.split(".").pop()?.toLowerCase();

  const languageMap: Record<string, string> = {
    ts: "typescript",
    tsx: "typescript",
    js: "javascript",
    jsx: "javascript",
    json: "json",
    md: "markdown",
    py: "python",
    css: "css",
    scss: "scss",
    html: "html",
    xml: "xml",
    sql: "sql",
    sh: "shell",
  };

  return languageMap[extension || ""] || "plaintext";
};

const getStatusIcon = (status: File["status"]): string => {
  const iconMap = {
    added: "🆕",
    modified: "✏️",
    removed: "🗑️",
    deleted: "❌",
  };

  return iconMap[status];
};

function MonacoTestPage() {
  const totalCommits = monacoData.length;
  const totalFiles = monacoData.reduce(
    (sum, commit) => sum + commit.files.length,
    0,
  );

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6">
      <header className="border-b pb-4">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          🧪 Monaco Diff Viewer Test
        </h1>
        <div className="flex gap-4 text-sm text-gray-600">
          <span>📊 Commits: {totalCommits}</span>
          <span>📄 Files: {totalFiles}</span>
        </div>
      </header>

      {monacoData.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-lg text-red-500">No commits available</p>
        </div>
      ) : (
        <div className="space-y-8">
          {monacoData.map((commit) => (
            <article
              key={commit.sha}
              className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
            >
              {/* Commit Header */}
              <header className="border-b bg-gray-50 px-6 py-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="mb-2 text-lg font-semibold text-gray-900">
                      💬 {commit.message}
                    </h2>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span>👤 {commit.author}</span>
                      <span>🕐 {new Date(commit.date).toLocaleString()}</span>
                      <span className="rounded bg-gray-200 px-2 py-1 font-mono text-xs">
                        {commit.sha.substring(0, 7)}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4 text-sm text-gray-500">
                    {commit.files.length} file
                    {commit.files.length !== 1 ? "s" : ""} changed
                  </div>
                </div>
              </header>

              {/* Files */}
              <div className="divide-y divide-gray-100">
                {commit.files.length === 0 ? (
                  <div className="px-6 py-8 text-center text-gray-500">
                    No file changes in this commit.
                  </div>
                ) : (
                  commit.files.map((file, fileIndex) =>
                    file.patch ? (
                      <section
                        key={`${commit.sha}-${fileIndex}`}
                        className="p-6"
                      >
                        <header className="mb-4 flex items-center gap-2">
                          <span className="text-xl">
                            {getStatusIcon(file.status)}
                          </span>
                          <h3 className="text-lg font-medium text-gray-800">
                            {file.filename}
                          </h3>
                        </header>

                        <MonacoDiffViewer
                          filename={file.filename}
                          patch={file.patch}
                          fileStatus={file.status}
                          language={getLanguageFromFilename(file.filename)}
                        />
                      </section>
                    ) : (
                      <div
                        key={`${commit.sha}-${fileIndex}`}
                        className="bg-gray-50 px-6 py-4"
                      >
                        <div className="flex items-center gap-2 text-gray-600">
                          <span>{getStatusIcon(file.status)}</span>
                          <span className="font-medium">{file.filename}</span>
                          <span className="text-sm">
                            ({file.status}, no diff available)
                          </span>
                        </div>
                      </div>
                    ),
                  )
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default MonacoTestPage;
