"use client";

import { Button } from "@/app/ui/common/button";
import { Column } from "@tanstack/react-table";

type ColumnHeaderButtonProps<TData, TValue> = {
  label: string;
  column: Column<TData, TValue>;
  onClick?: () => void;
};

function ColumnHeaderButton<TData, TValue>({
  label,
  onClick,
  column,
}: ColumnHeaderButtonProps<TData, TValue>) {
  const sorted = column.getIsSorted();
  const icon = sorted === "asc" ? "⬆️" : sorted === "desc" ? "⬇️" : "↕️";

  return (
    <Button
      type="button"
      onClick={onClick}
      variant="ghost"
      className="h-8 cursor-pointer px-2 text-lg font-bold text-gray-700 hover:bg-transparent hover:text-black"
    >
      {label} <span className="text-base">{icon}</span>
    </Button>
  );
}

export default ColumnHeaderButton;
