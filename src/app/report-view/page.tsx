import Header from "@/app/ui/report-view/header/header";
import MainSection from "@/app/ui/report-view/main-area/main-section";
import AsideSection from "@/app/ui/report-view/aside-area/aside-section";

function ReportViewPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50 px-[10%] font-sans break-words break-keep whitespace-normal">
      <div className="mt-8 mb-8 flex w-full flex-col">
        <Header />
        <div className="flex flex-grow flex-col space-y-6 lg:flex-row lg:space-y-0 lg:space-x-6">
          <MainSection />
          <AsideSection />
        </div>
      </div>
    </div>
  );
}

export default ReportViewPage;
