"use client";

import * as React from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  RowSelectionState,
  getSortedRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/app/ui/common/table";

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  getRowKey: (row: TData) => string;
  onSelectionChange: (ids: string[]) => void;
};

function DataTable<TData, TValue>({
  columns,
  data,
  getRowKey,
  onSelectionChange,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([
    {
      id: "createdAt",
      desc: true,
    },
  ]);
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getRowId: getRowKey,
    state: {
      sorting,
      rowSelection,
    },
    onRowSelectionChange: (updater) => {
      setRowSelection((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        const ids = Object.keys(next).filter((id) => next[id]);
        onSelectionChange(ids);
        return next;
      });
    },
  });

  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-gray-100 shadow-sm">
      <Table className="table-fixed">
        <TableHeader className="bg-gray-200">
          <TableRow>
            {table.getHeaderGroups()[0].headers.map((header) => (
              <TableHead
                key={header.id}
                style={{ width: header.column.columnDef.size }}
                className="px-4 py-3 text-center text-lg font-bold text-gray-700"
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="hover:bg-gray-50"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    style={{ width: cell.column.columnDef.size }}
                    className="border-b border-gray-100 bg-white px-4 py-3 text-center text-base text-gray-800"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 bg-white text-center text-gray-500"
              >
                일치하는 검색 결과가 없습니다.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* <TableFooter currentPage={page} onPageChange={setPage} /> */}
    </div>
  );
}

export default DataTable;
