"use client";

import { useState } from "react";
import { ReportHistory } from "@/app/types/report-history";
import { Modal } from "@/app/ui/common/Modal";
import { Trash2 } from "lucide-react";

function ReportHistoryItem({
  item,
  onSelect,
  onDelete,
}: {
  item: ReportHistory;
  onSelect: (it: ReportHistory) => void;
  onDelete: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <li>
      <div
        role="button"
        onClick={() => onSelect(item)}
        className="flex h-10 w-full items-center justify-between truncate px-2 text-left hover:bg-orange-300 hover:text-white"
        title={item.reportTitle}
      >
        <span className="truncate">{item.reportTitle}</span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
          }}
          className="p-1 hover:text-red-500"
        >
          <Trash2 className="w-6 shrink-0" />
        </button>
      </div>

      <Modal
        open={open}
        title={`"${item.reportTitle}" 기록을(를)\n삭제하시겠습니까?`}
        description="이 작업은 되돌릴 수 없습니다."
        confirmLabel="삭제"
        cancelLabel="취소"
        onConfirm={() => {
          onDelete();
          setOpen(false);
        }}
        onCancel={() => setOpen(false)}
      />
    </li>
  );
}

export default ReportHistoryItem;
