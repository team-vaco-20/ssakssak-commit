import mockdata from "@/mocks/data/openAi.json";

function SummaryBox() {
  return (
    <div className="mx-auto mb-3 min-h-[150px] w-[95%] rounded-[10px] border-2 border-gray-500 p-2">
      <p className="ml-2 text-xl font-bold"> 전체 분석 및 요약</p>
      <div className="mt-[1px] border-[1px] border-gray-300"></div>
      <p className="text-lg">{mockdata.result.reportSummary}</p>
    </div>
  );
}

export default SummaryBox;
