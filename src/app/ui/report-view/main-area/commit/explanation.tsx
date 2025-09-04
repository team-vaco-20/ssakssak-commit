import { Analysis } from "@/app/types/commit";

interface AnalysisSummaryProps {
  data: Analysis[];
}

function Explanation({ data }: AnalysisSummaryProps) {
  return (
    <div className="mb-4 min-h-[150px] rounded-[10px] border-2 border-gray-500 p-2">
      {data.map((item, index) => (
        <div key={index}>
          <p className="mb-1 ml-2 text-lg font-bold">
            요약 & 분석: {item.title}
          </p>
          <div className="border-[1px] border-gray-300"></div>
          <p key={index} className="ml-2 text-lg">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Explanation;
