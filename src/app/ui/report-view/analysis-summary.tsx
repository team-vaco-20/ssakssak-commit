import mockdata from "@/mocks/data/report.json";

function AnalysisSummary() {
  return (
    <div className="mb-4 min-h-[150px] rounded-[10px] border-2 border-gray-500 p-2">
      <p className="mb-1 ml-2 text-lg font-bold">요약 & 분석</p>
      <div className="border-[1px] border-gray-300"></div>
      <p className="ml-2 text-lg">{mockdata.mockCommit.commitSummary}</p>
    </div>
  );
}

export default AnalysisSummary;
