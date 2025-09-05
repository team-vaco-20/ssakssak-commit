"use client";

import { useReportHistory } from "@/stores/report-history/hooks";
import { useState } from "react";
import { ReportHistory } from "@/app/types/context";
import ReportHistoryList from "@/app/ui/layout/items/search-section/report-history-list";
import historyList from "@/mocks/data/report-history-list.json";

function ReportHistoryPanel() {
  const [search, setSearch] = useState<string>("");
  const { setSelected } = useReportHistory();
  const query = search.trim().toLowerCase();

  const filteredList = query
    ? historyList.filter((history) =>
        history.reportTitle.toLowerCase().includes(query),
      )
    : historyList;

  const handleSelect = (reportHistory: ReportHistory) => {
    setSelected({
      reportTitle: reportHistory.reportTitle,
      repositoryOverview: reportHistory.repositoryOverview ?? "",
    });
  };

  return (
    <div className="hidden w-full rounded-md bg-gray-50 md:block">
      <p className="rounded-t bg-black p-2 text-white">리포트 생성 기록</p>

      <input
        className="w-full border-orange-300 bg-[#F3EEE3] bg-gray-200 px-2 py-2 text-black placeholder:text-gray-400 focus:border-orange-400"
        onChange={(e) => setSearch(e.target.value)}
        placeholder="생성 기록 검색"
      />

      <ReportHistoryList items={filteredList} onSelect={handleSelect} />
    </div>
  );
}

export default ReportHistoryPanel;
