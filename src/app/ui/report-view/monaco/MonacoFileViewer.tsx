"use client";

import { useRef, useEffect } from "react";
import MonacoEditor, { OnMount } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import type { MonacoFileViewerProps } from "@/app/types/monaco";
import {
  getStatusTagStyle,
  getHighlightClassName,
  getHighlightColor,
} from "@/lib/monacoUtils";

const MonacoFileViewer = ({
  filename,
  fileStatus,
  code,
  language,
  highlights,
  readonly = true,
}: MonacoFileViewerProps) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const decorationsRef =
    useRef<monaco.editor.IEditorDecorationsCollection | null>(null);

  const handleEditorMount: OnMount = (editor, monacoInstance) => {
    editorRef.current = editor;

    const decorations: monaco.editor.IModelDeltaDecoration[] = highlights.map(
      (highlight) => ({
        range: new monacoInstance.Range(
          highlight.startLine,
          1,
          highlight.endLine,
          code.split("\n")[highlight.endLine - 1]?.length + 1 || 1,
        ),
        options: {
          isWholeLine: true,
          className: getHighlightClassName(fileStatus),
          minimap: {
            color: getHighlightColor(fileStatus),
            position: monacoInstance.editor.MinimapPosition.Inline,
          },
          overviewRuler: {
            color: getHighlightColor(fileStatus),
            position: monacoInstance.editor.OverviewRulerLane.Right,
          },
        },
      }),
    );

    decorationsRef.current = editor.createDecorationsCollection(decorations);
  };

  useEffect(() => {
    return () => {
      decorationsRef.current?.clear();
    };
  }, []);

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
