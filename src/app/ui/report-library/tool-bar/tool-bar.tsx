"use client";

import SearchBar from "./search-bar";
import Controls from "./controls";
import { Button } from "@/app/ui/common/button";

type ToolBarParams = {
  onSearchChange: (value: string) => void;
  selectedReportIds: string[];
};

function ToolBar({ onSearchChange, selectedReportIds }: ToolBarParams) {
  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white p-4 text-base shadow-sm">
      <SearchBar onSearchChage={onSearchChange} />
      <Controls>
        <Button className="cursor-pointer rounded-lg border border-gray-200 bg-white text-lg text-gray-700 hover:bg-gray-50 active:scale-[0.99]">
          🔄 새로고침
        </Button>
        <Button className="cursor-pointer rounded-lg border border-gray-200 bg-white text-lg text-gray-700 hover:bg-gray-50 active:scale-[0.99]">
          ♻️ 초기화
        </Button>
        <Button
          onClick={() => {}}
          // disabled={}
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
  );
}

export default ToolBar;
