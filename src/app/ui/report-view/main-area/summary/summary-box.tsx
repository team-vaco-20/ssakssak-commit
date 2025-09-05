import mockdata from "@/mocks/data/openAi.json";

function SummaryBox() {
  return (
    <div className="mx-auto mb-6 w-full rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <p className="mb-2 text-xl font-semibold text-gray-800">
        📊 전체 분석 및 요약
      </p>
      <div className="mb-4 h-px bg-gray-200"></div>
      <p className="text-base leading-relaxed text-gray-700">
        {mockdata.result.reportSummary}
      </p>
    </div>
  );
}

export default SummaryBox;
