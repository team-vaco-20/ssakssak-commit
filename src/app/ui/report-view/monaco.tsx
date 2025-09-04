"use client";

import mockAnalysisData from "@/mocks/data/monaco.json";
import type { AnalysisData } from "@/app/types/monaco";
import { MonacoFileCard } from "./monaco/MonacoFileCard";

const analysisData = mockAnalysisData as AnalysisData;

function Monaco() {
  const totalFiles = analysisData.files.length;

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6">
      {totalFiles === 0 ? (
        <div className="py-12 text-center">
          <p className="text-lg text-red-500">No files available</p>
        </div>
      ) : (
        <div className="space-y-8">
          {analysisData.files.map((file, index) => (
            <MonacoFileCard key={`${file.path}-${index}`} file={file} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Monaco;
