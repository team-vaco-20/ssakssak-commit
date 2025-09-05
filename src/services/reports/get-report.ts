"use client";

import { ReportData } from "@/app/types/commit";

function getReport(reportId: string): ReportData | null {
  const key = `guest:report:${reportId}`;
  const storedData = sessionStorage.getItem(key);

  if (!storedData) return null;

  try {
    return JSON.parse(storedData) as ReportData;
  } catch (error) {
    console.error("sessionStorage 데이터 파싱 실패:", error);
    return null;
  }
}

export default getReport;
