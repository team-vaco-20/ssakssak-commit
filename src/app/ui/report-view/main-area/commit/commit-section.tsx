// ui/report-view/layout/main-area/commit-section.tsx

import mockdata from "@/mocks/data/report.json";
import KeyChanges from "@/app/ui/report-view/main-area/commit/key-changes";
import AnalysisSummary from "@/app/ui/report-view/main-area/commit/analysis-summary";
import DiagramBox from "@/app/ui/report-view/main-area/commit/diagram-box";

function CommitSection() {
  return (
    <section
      aria-labelledby="details-title"
      className="mx-auto mt-2 flex w-[95%] flex-grow flex-col rounded-[10px] border-2 border-gray-500 bg-white p-4 shadow-sm"
    >
      <div className="mb-3 ml-2 flex items-center justify-between">
        <span className="text-xl font-bold">
          선택한 커밋에 대한 요약 & 분석
        </span>
        <div className="ml-4 flex gap-4 text-sm text-gray-700">
          <span>#{mockdata.mockCommit.commitId}</span>
          <span>{mockdata.mockCommit.commitMessage}</span>
        </div>
      </div>
      <div className="mb-3 border-[1px] border-gray-300"></div>

      <AnalysisSummary />
      <KeyChanges />
      <DiagramBox />
    </section>
  );
}

export default CommitSection;
