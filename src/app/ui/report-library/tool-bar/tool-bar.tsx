"use client";

import SearchBar from "./search-bar";
import Controls from "./controls";
import { Button } from "@/app/ui/common/button";
import { useState } from "react";
import { Modal, AlertModal } from "@/app/ui/common/Modal";
import { DATA_ERROR_MESSAGES } from "@/constants/error-messages";

type ToolBarParams = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onReset: () => void;
  selectedReportIds: string[];
};

function ToolBar({
  searchValue,
  onSearchChange,
  onReset,
  selectedReportIds,
}: ToolBarParams) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const deleteSelectedReports = async () => {
    try {
      const response = await fetch("/api/reports", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selectedReportIds }),
      });

      if (!response.ok) {
        setErrorMessage(DATA_ERROR_MESSAGES.DELETE);
      }
    } catch {}
  };

  return (
    <>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-300 bg-white p-4 text-base shadow-sm">
        <SearchBar value={searchValue} onSearchChange={onSearchChange} />
        <Controls>
          <Button className="cursor-pointer rounded-lg border border-gray-200 bg-white text-lg text-gray-700 hover:bg-gray-50 active:scale-[0.99]">
            🔄 새로고침
          </Button>
          <Button
            className="cursor-pointer rounded-lg border border-gray-200 bg-white text-lg text-gray-700 hover:bg-gray-50 active:scale-[0.99]"
            onClick={onReset}
          >
            ♻️ 초기화
          </Button>
          <Button
            onClick={() => {
              setIsModalOpen(true);
            }}
            disabled={selectedReportIds.length === 0}
            className={`rounded-lg px-4 py-2 text-base text-lg font-medium transition active:scale-[0.99] ${
              selectedReportIds.length === 0
                ? "border border-gray-200 bg-white text-gray-400 opacity-50"
                : "cursor-pointer bg-gray-900 text-white hover:bg-black"
            }`}
          >
            🗑️ 선택 삭제({selectedReportIds.length})
          </Button>
        </Controls>
      </div>

      <Modal
        open={isModalOpen}
        title={`선택하신 리포트 ${selectedReportIds.length}개를 \n삭제하시겠습니까?`}
        description="이 작업은 되돌릴 수 없습니다."
        confirmLabel="삭제"
        cancelLabel="취소"
        onConfirm={() => {
          deleteSelectedReports();
          setIsModalOpen(false);
        }}
        onCancel={() => setIsModalOpen(false)}
      />

      <AlertModal
        open={!!errorMessage}
        title="삭제 실패"
        description={errorMessage}
        cancelLabel="닫기"
        onCancel={() => setErrorMessage("")}
      />
    </>
  );
}

export default ToolBar;
