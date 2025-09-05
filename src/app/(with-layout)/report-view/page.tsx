import Header from "@/app/ui/report-view/header/header";
import MainSection from "@/app/ui/report-view/main-area/main-section";
import AsideSection from "@/app/ui/report-view/aside-area/aside-section";

function ReportViewPage() {
  return (
    <div className="flex min-h-screen w-screen flex-col bg-gray-50 px-[10%] break-words break-keep whitespace-normal">
      <div className="mt-4 mb-6 flex w-full flex-col rounded-[20px] border-2 border-gray-500 bg-white shadow-md">
        <Header />
        <div className="border-[1px] border-gray-500"></div>
        <div className="mt-2 mb-2 flex flex-grow flex-row">
          <MainSection />
          <AsideSection />
        </div>
      </div>
    </div>
  );
}

export default ReportViewPage;
