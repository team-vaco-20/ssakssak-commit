import Header from "@/app/ui/report-view/header/header";
import MainSection from "@/app/ui/report-view/main-area/main-section";
import AsideSection from "@/app/ui/report-view/aside-area/aside-section";

function ReportViewPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-100 px-[10%] font-sans break-words break-keep whitespace-normal">
      <div className="mt-4 mb-6 flex w-full flex-col rounded-lg border-b border-gray-200 bg-white shadow-md">
        <Header />
        <div className="border-[1px] border-gray-300"></div>
        <div className="mt-2 mb-2 flex flex-grow flex-row space-x-6">
          <MainSection />
          <AsideSection />
        </div>
      </div>
    </div>
  );
}

export default ReportViewPage;
