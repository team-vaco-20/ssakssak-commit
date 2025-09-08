"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/app/ui/common/checkbox";
import ColumnHeaderButton from "@/app/ui/report-library/table/column-header-button";

type Report = {
  reportId: string;
  reportTitle: string;
  repositoryName: string;
  owner: string;
  branchName: string;
  createdAt: string;
};

const columns: ColumnDef<Report>[] = [
  {
    id: "select",
    size: 44,
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "reportTitle",
    size: 300,
    header: ({ column }) => (
      <ColumnHeaderButton
        label="리포트 제목"
        column={column}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    cell: ({ row }) => (
      <span className="block truncate">{row.getValue("reportTitle")}</span>
    ),
  },
  {
    accessorKey: "repositoryName",
    size: 260,
    header: ({ column }) => (
      <ColumnHeaderButton
        column={column}
        label="리포지토리 명"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    cell: ({ row }) => (
      <span className="block truncate">{row.getValue("repositoryName")}</span>
    ),
  },
  {
    accessorKey: "owner",
    size: 160,
    header: ({ column }) => (
      <ColumnHeaderButton
        column={column}
        label="리포지토리 소유자"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    cell: ({ row }) => (
      <span className="block truncate">{row.getValue("owner")}</span>
    ),
  },
  {
    accessorKey: "branchName",
    size: 320,
    header: ({ column }) => (
      <ColumnHeaderButton
        column={column}
        label="브랜치 명"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    cell: ({ row }) => (
      <span className="block truncate">{row.getValue("branchName")}</span>
    ),
  },
  {
    accessorKey: "createdAt",
    size: 180,
    header: ({ column }) => (
      <ColumnHeaderButton
        column={column}
        label="생성일시"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    cell: ({ row }) => <span>{row.getValue("createdAt")}</span>,
  },
  {
    id: "actions",
    enableHiding: false,
    size: 56,
    cell: () => (
      <button
        type="button"
        className="h-8 w-8 cursor-pointer rounded-full hover:text-red-600"
        title="삭제"
      >
        🗑️
      </button>
    ),
  },
];

export type { Report };
export { columns };
