"use client";

import { MonacoFileViewer } from "@/app/ui/report-view/monaco/MonacoFileViewer";
import mockAnalysisData from "@/mocks/data/monaco.json";
import type { AnalysisData } from "@/app/types/monaco";
import { getStatusIcon } from "@/lib/monacoUtils";

const analysisData = mockAnalysisData as AnalysisData;

function Monaco() {
  const totalFiles = analysisData.files.length;

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6">
      <header className="border-b pb-4">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          🧪 Monaco AI Highlight Viewer Test
        </h1>
        <div className="flex gap-4 text-sm text-gray-600">
          <span>📄 Files: {totalFiles}</span>
        </div>
      </header>
      {analysisData.files.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-lg text-red-500">No files available</p>
        </div>
      ) : (
        <div className="space-y-8">
          {analysisData.files.map((file, index) => (
            <article
              key={`${file.path}-${file.status}-${index}`}
              className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
            >
              <section className="p-6">
                <header className="mb-4 flex items-center gap-2">
                  <span className="text-xl">{getStatusIcon(file.status)}</span>
                  <h3 className="text-lg font-medium text-gray-800">
                    {file.path}
                  </h3>
                </header>
                <MonacoFileViewer
                  filename={file.path}
                  fileStatus={file.status}
                  code={file.code}
                  language={file.language}
                  highlights={file.highlights}
                />
              </section>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default Monaco;
