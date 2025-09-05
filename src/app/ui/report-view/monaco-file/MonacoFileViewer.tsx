"use client";

import MonacoEditor from "@monaco-editor/react";
import type { MonacoFileViewerProps } from "@/app/types/monaco";
import { useMonacoEditorDecorations } from "@/hooks/useMonacoEditorDecorations";
import { MonacoFileHeader } from "@/app/ui/report-view/monaco-file/MonacoFileHeader";

function MonacoFileViewer({
  filename,
  fileStatus,
  code,
  language,
  highlights,
  readOnly = true,
}: MonacoFileViewerProps) {
  const { handleEditorMount } = useMonacoEditorDecorations({
    code,
    highlights,
    fileStatus,
  });

  return (
    <div className="overflow-hidden rounded border border-gray-200">
      <MonacoFileHeader filename={filename} fileStatus={fileStatus} />

      <MonacoEditor
        height="400px"
        language={language}
        value={code}
        options={{
          readOnly: readOnly,
          minimap: { enabled: true },
          scrollBeyondLastLine: false,
          wordWrap: "on",
          fontSize: 13,
          lineNumbers: "on",
          glyphMargin: true,
          folding: true,
          renderWhitespace: "boundary",
        }}
        onMount={handleEditorMount}
        theme="vs-light"
      />
    </div>
  );
}

export { MonacoFileViewer };
