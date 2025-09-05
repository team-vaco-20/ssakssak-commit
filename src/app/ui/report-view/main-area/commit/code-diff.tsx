import { Analysis } from "@/app/types/commit";
import { MonacoFileViewer } from "@/app/ui/report-view/monaco-file/MonacoFileViewer";

interface AnalysisSummaryProps {
  data: Analysis[];
}

function CodeDiff({ data }: AnalysisSummaryProps) {
  return (
    <div className="mb-4 min-h-[150px] p-2">
      {data.map((item) => (
        <div key={item.title}>
          <p className="mb-2 text-base font-semibold text-gray-800">
            변경 사항: {item.title}
          </p>
          <div className="mb-4 h-px bg-gray-200"></div>
          <p className="text-sm leading-relaxed text-gray-700">
            {item.description}
          </p>

          {item.files?.map((file, fileIndex) => (
            <div key={fileIndex} className="mb-6">
              <MonacoFileViewer
                filename={file.path}
                fileStatus={file.status}
                code={file.code}
                language={file.language}
                highlights={file.highlights}
              />
              <div className="mt-4 flex items-center space-x-2 border-t border-gray-200 pt-2">
                <span>➡️</span>
                <p className="rounded-md bg-purple-50 p-2 text-sm font-medium text-purple-800 shadow-sm">
                  {file.codeDiffSummary}
                </p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default CodeDiff;
