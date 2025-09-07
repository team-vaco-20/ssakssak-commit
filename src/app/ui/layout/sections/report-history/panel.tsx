"use client";

import { useReportHistory } from "@/stores/report-history/hooks";
import { useState } from "react";
import { ReportHistory } from "@/app/types/report-history";
import ReportHistoryList from "@/app/ui/layout/sections/report-history/list";
import historyList from "@/mocks/data/report-history-list.json";
import { AlertModal } from "@/app/ui/common/Modal";
import {
  DATA_ERROR_MESSAGES,
  SYSTEM_ERROR_MESSAGES,
} from "@/constants/error-messages";

function ReportHistoryPanel() {
  const [search, setSearch] = useState<string>("");
  const [items, setItems] = useState<ReportHistory[]>(historyList);
  const [error, setError] = useState<string | null>(null);
  const { setSelected } = useReportHistory();

  const query = search.trim().toLowerCase();
  const filteredList = query
    ? items.filter((item) => item.reportTitle.toLowerCase().includes(query))
    : items;

  const handleSelect = (reportHistory: ReportHistory) => {
    setSelected({
      reportHistoryId: reportHistory.reportHistoryId,
      reportTitle: reportHistory.reportTitle,
      repositoryOverview: reportHistory.repositoryOverview ?? "",
      repositoryUrl: reportHistory.repositoryUrl,
    });
  };

  const handleDelete = async (reportHistoryId: string) => {
    try {
      const response = await fetch(`/api/report-histories/${reportHistoryId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        setError(DATA_ERROR_MESSAGES.DELETE);
        return;
      }
      setItems((prev) =>
        prev.filter((history) => history.reportHistoryId !== reportHistoryId),
      );
    } catch {
      setError(SYSTEM_ERROR_MESSAGES.NETWORK);
    }
  };

  return (
    <div className="hidden w-full rounded-md bg-gray-50 md:block">
      <p className="rounded-t bg-black p-2 text-white">리포트 생성 기록</p>

      <input
        className="w-full border-orange-300 bg-[#F3EEE3] bg-gray-200 px-2 py-2 text-black placeholder:text-gray-400 focus:border-orange-400"
        onChange={(e) => setSearch(e.target.value)}
        placeholder="생성 기록 검색"
      />

      <ReportHistoryList
        reportHistories={filteredList}
        onSelect={handleSelect}
        onDelete={handleDelete}
      />

      <AlertModal
        open={!!error}
        title="삭제 실패"
        description={error || SYSTEM_ERROR_MESSAGES.NETWORK}
        cancelLabel="닫기"
        onCancel={() => setError(null)}
      />
    </div>
  );
}

export default ReportHistoryPanel;
