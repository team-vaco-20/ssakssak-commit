"use client";

import MonacoEditor from "@monaco-editor/react";
import type { MonacoFileViewerProps } from "@/app/types/monaco";
import { getStatusTagStyle } from "@/lib/monacoUtils";
import { useMonacoEditorDecorations } from "@/hooks/useMonacoEditorDecorations";

const MonacoFileViewer = ({
  filename,
  fileStatus,
  code,
  language,
  highlights,
  readonly = true,
}: MonacoFileViewerProps) => {
  const { handleEditorMount } = useMonacoEditorDecorations({
    code,
    highlights,
    fileStatus,
  });

  return (
    <div className="overflow-hidden rounded border border-gray-200">
      <div className="flex items-center gap-2 border-b bg-gray-100 px-3 py-2 text-sm font-medium">
        <span className="font-medium text-gray-700">{filename}</span>
        <span
          className={`rounded-full px-2 py-1 text-xs font-semibold ${getStatusTagStyle(fileStatus)}`}
        >
          {fileStatus}
        </span>
      </div>

      <MonacoEditor
        height="400px"
        language={language}
        value={code}
        options={{
          readOnly: readonly,
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
};

export { MonacoFileViewer };
