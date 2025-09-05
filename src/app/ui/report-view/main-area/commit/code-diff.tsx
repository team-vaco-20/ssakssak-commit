import { Analysis } from "@/app/types/commit";
import { MonacoFileViewer } from "@/app/ui/report-view/monaco-file/MonacoFileViewer";

interface AnalysisSummaryProps {
  data: Analysis[];
}

function CodeDiff({ data }: AnalysisSummaryProps) {
  return (
    <div className="mb-4 min-h-[150px] p-2">
      {data.map((item, index) => (
        <div key={index}>
          <p className="mb-1 ml-2 text-lg font-bold">변경 사항: {item.title}</p>
          <div className="border-[1px]"></div>
          <p key={index} className="mt-2 mb-2 bg-yellow-50 px-2 py-2 shadow-sm">
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
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default CodeDiff;
