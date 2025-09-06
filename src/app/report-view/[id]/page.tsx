"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ReportData } from "@/app/types/commit";

import Header from "@/app/ui/report-view/header/header";
import MainSection from "@/app/ui/report-view/main-area/main-section";
import AsideSection from "@/app/ui/report-view/aside-area/aside-section";

function ReportViewPage() {
  const { id: reportId } = useParams<{ id: string }>();
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!reportId) return;

    const key = `guest:report:${reportId}`;
    const storedData = sessionStorage.getItem(key);

    if (!storedData) {
      alert("세션에서 리포트 데이터를 찾을 수 없습니다.");
      router.replace("/");
      return;
    }

    try {
      const parsedData = JSON.parse(storedData) as ReportData;
      setReportData(parsedData);
    } catch (error) {
      console.error("세션 데이터 파싱 실패:", error);
      alert("다시 요청해주세요");
      router.replace("/");
    }
  }, [reportId, router]);

  if (!reportData) return null;

  return (
    <div className="flex min-h-screen w-full flex-col scroll-smooth bg-gray-50 px-[10%] font-sans break-words break-keep whitespace-normal">
      <div className="mt-8 mb-8 flex w-full flex-col">
        <Header
          reportTitle={reportData.reportTitle}
          repositoryUrl={reportData.repositoryUrl}
          branch={reportData.branch}
        />
        <div className="flex flex-grow flex-col space-y-6 lg:flex-row lg:space-y-0 lg:space-x-6">
          <MainSection
            reportSummary={reportData.reportSummary}
            commits={reportData.commits}
          />
          <AsideSection commits={reportData.commits} />
        </div>
      </div>
    </div>
  );
}

export default ReportViewPage;
