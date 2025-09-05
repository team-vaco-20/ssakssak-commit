import { Analysis } from "@/app/types/commit";
import Mermaid from "@/app/ui/report-view/mermaid";
import { MermaidConfig } from "mermaid";

interface AnalysisSummaryProps {
  data: Analysis[];
}

function DiagramBox({ data }: AnalysisSummaryProps) {
  const defaultMermaidConfig: MermaidConfig = {
    startOnLoad: false,
    securityLevel: "strict",
    theme: "default",
    fontFamily: "Arial, sans-serif",
  };

  return (
    <div className="min-h-[200px] p-2">
      {data.map((item, index) => (
        <div key={index}>
          <p className="mb-1 ml-2 text-lg font-bold">{item.title}</p>
          <div className="border-[1px] border-gray-300"></div>
          <p key={index} className="mt-2 mb-2 bg-purple-50 px-2 py-2 shadow-sm">
            {item.description}
          </p>

          {item.type === "diagram" && item.chart && (
            <div className="mt-4">
              <Mermaid
                chart={item.chart}
                title={item.title}
                description={item.description}
                config={defaultMermaidConfig}
              />
              {item.caption && (
                <p className="mt-2 text-center text-sm text-gray-600 italic">
                  {item.caption}
                </p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default DiagramBox;
