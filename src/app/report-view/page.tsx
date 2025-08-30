import Header from "../ui/report-view/header";
import SummaryBox from "../ui/report-view/summary-box";
import CommitChanges from "../ui/report-view/commit-changes";
import DiagramBox from "../ui/report-view/diagram-box";
import CommitList from "../ui/report-view/commit-list";
import RequirementList from "../ui/report-view/requirement-list";

function reportViewPage() {
  return (
    <div className="flex min-h-screen w-screen flex-col bg-gray-50 px-[10%] break-words break-keep whitespace-normal">
      <div className="mt-4 mb-6 flex w-full flex-col rounded-[20px] border-2 border-gray-500 bg-white shadow-md">
        <Header />
        <div className="border-[1px] border-gray-500"></div>

        <div className="mt-2 mb-2 flex flex-grow flex-row">
          <main className="flex min-w-0 basis-[70%] flex-col overflow-y-auto">
            <SummaryBox />
            <div className="mr-5 mb-2 ml-5 border-[1px] border-gray-200"></div>

            <div className="mx-auto mt-2 flex w-[95%] flex-grow flex-col rounded-[10px] border-2 border-gray-500 bg-white p-4 shadow-sm">
              <CommitChanges />
              <DiagramBox />
            </div>
          </main>

          <aside className="flex min-w-0 basis-[30%] flex-col overflow-y-auto">
            <div className="mx-auto flex h-full w-[90%] flex-col rounded-[10px] border-2 border-gray-500 bg-white p-4">
              <CommitList />
              <RequirementList />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default reportViewPage;
