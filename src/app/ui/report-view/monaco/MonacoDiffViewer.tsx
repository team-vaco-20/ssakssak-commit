"use client";

import { useRef, useEffect } from "react";
import MonacoEditor, { OnMount } from "@monaco-editor/react";
import * as monaco from "monaco-editor";

type DiffHighlight = {
  lineStart: number;
  lineEnd: number;
  type: "addition" | "deletion";
};

type FileStatus = "added" | "modified" | "removed" | "deleted";

interface MonacoDiffViewerProps {
  filename: string;
  patch: string;
  fileStatus: FileStatus;
  language?: string;
  readonly?: boolean;
}

const parsePatchHighlights = (patch: string): DiffHighlight[] => {
  const lines = patch.split("\n");
  const highlights: DiffHighlight[] = [];

  let newLineNumber = 1;

  for (const line of lines) {
    if (line.startsWith("@@")) {
      const match = line.match(/@@ -(\d+)(?:,\d+)? \+(\d+)(?:,(\d+))? @@/);
      if (match) {
        newLineNumber = parseInt(match[1], 10);
      }
    } else if (line.startsWith("+") && !line.startsWith("+++")) {
      highlights.push({
        lineStart: newLineNumber,
        lineEnd: newLineNumber,
        type: "addition",
      });
      newLineNumber++;
    } else if (line.startsWith("-") && !line.startsWith("---")) {
      highlights.push({
        lineStart: newLineNumber,
        lineEnd: newLineNumber,
        type: "deletion",
      });
    } else if (
      !line.startsWith("\\") &&
      !line.startsWith("@@") &&
      !line.startsWith("---") &&
      !line.startsWith("+++")
    ) {
      newLineNumber++;
    }
  }

  return highlights;
};

const extractCodeFromPatch = (patch: string): string => {
  return patch
    .split("\n")
    .filter(
      (line) =>
        !line.startsWith("---") &&
        !line.startsWith("+++") &&
        !line.startsWith("@@") &&
        !line.startsWith("\\"),
    )
    .map((line) => line.replace(/^[-+]/, ""))
    .join("\n");
};

const getFileStatusStyle = (status: FileStatus): string => {
  const statusStyles = {
    added: "border-l-4 border-green-600 bg-green-50",
    modified: "border-l-4 border-blue-600 bg-blue-50",
    removed: "border-l-4 border-red-600 bg-red-50",
    deleted: "border-l-4 border-gray-600 bg-gray-50",
  };

  return statusStyles[status] || "";
};

const MonacoDiffViewer = ({
  filename,
  patch,
  fileStatus,
  language = "typescript",
  readonly = true,
}: MonacoDiffViewerProps) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const decorationsRef =
    useRef<monaco.editor.IEditorDecorationsCollection | null>(null);

  const handleEditorMount: OnMount = (editor, monacoInstance) => {
    editorRef.current = editor;

    const highlights = parsePatchHighlights(patch);

    const decorations: monaco.editor.IModelDeltaDecoration[] = highlights.map(
      (highlight) => ({
        range: new monacoInstance.Range(
          highlight.lineStart,
          1,
          highlight.lineEnd,
          1,
        ),
        options: {
          isWholeLine: true,
          className:
            highlight.type === "addition"
              ? "bg-green-100 border-l-4 border-green-500"
              : "bg-red-100 border-l-4 border-red-500",
          minimap: {
            color: highlight.type === "addition" ? "#22c55e" : "#ef4444",
            position: monacoInstance.editor.MinimapPosition.Inline,
          },
          overviewRuler: {
            color: highlight.type === "addition" ? "#22c55e" : "#ef4444",
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

  const code = extractCodeFromPatch(patch);

  return (
    <div
      className={`overflow-hidden rounded border ${getFileStatusStyle(fileStatus)}`}
    >
      <div className="border-b bg-gray-100 px-3 py-2 text-sm font-medium">
        <span className="text-gray-700">{filename}</span>
        <span
          className={`ml-2 rounded-full px-2 py-1 text-xs ${
            fileStatus === "added"
              ? "bg-green-100 text-green-800"
              : fileStatus === "modified"
                ? "bg-blue-100 text-blue-800"
                : fileStatus === "removed" || fileStatus === "deleted"
                  ? "bg-red-100 text-red-800"
                  : "bg-gray-100 text-gray-800"
          }`}
        >
          {fileStatus}
        </span>
      </div>
      <MonacoEditor
        height="400px"
        defaultLanguage={language}
        defaultValue={code}
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

export { MonacoDiffViewer };
