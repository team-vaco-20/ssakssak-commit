import mockdata from "@/mocks/data/report.json";
import KeyChanges from "./key-changes";
import AnalysisSummary from "./analysis-summary";

function CommitChanges() {
  return (
    <div>
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
    </div>
  );
}

export default CommitChanges;
