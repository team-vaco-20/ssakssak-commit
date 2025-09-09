"use client";
import { useMemo } from "react";
import { Report } from "./columns";

type SortState = { key: keyof Report | null; dir: "asc" | "desc" };

type Column = {
  key: keyof Report | "select" | "actions";
  label: string;
  width: string;
  align?: "left" | "center" | "right";
  sortable?: boolean;
};

type DataTableProps = {
  data: Report[];
  columns: Column[];
  selectedIds: string[];
  onSelectionChange?: (ids: string[]) => void;
  onDeleteOne?: (id: string) => void;
  sort: SortState;
  onSortChange: (next: SortState) => void;
};

function DataTable({
  data,
  columns,
  selectedIds,
  onSelectionChange,
  sort,
  onSortChange,
  onDeleteOne,
}: DataTableProps) {
  const allIds = useMemo(() => data.map((r) => r.reportId), [data]);
  const allChecked =
    allIds.length > 0 && allIds.every((id) => selectedIds.includes(id));
  const someChecked =
    !allChecked && allIds.some((id) => selectedIds.includes(id));

  const toggleAll = (checked: boolean) => {
    const next = new Set(selectedIds);
    if (checked) allIds.forEach((id) => next.add(id));
    else allIds.forEach((id) => next.delete(id));

    onSelectionChange?.([...next]);
  };

  const toggleRow = (id: string, checked: boolean) => {
    const next = new Set(selectedIds);
    if (checked) {
      next.add(id);
    } else {
      next.delete(id);
    }

    onSelectionChange?.([...next]);
  };

  const handleSortClick = (col: Column) => {
    if (!col.sortable || col.key === "select" || col.key === "actions") return;
    onSortChange(
      sort.key !== col.key
        ? { key: col.key as keyof Report, dir: "asc" }
        : {
            key: col.key as keyof Report,
            dir: sort.dir === "asc" ? "desc" : "asc",
          },
    );
  };

  const sortIcon = (col: Column) => {
    if (!col.sortable) return null;
    if (sort.key !== col.key) {
      return (
        <svg
          className="ml-1 h-4 w-4 text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 9l4-4 4 4m0 6l-4 4-4-4"
          />
        </svg>
      );
    }
    return (
      <svg
        className="ml-1 h-4 w-4 text-gray-700"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d={sort.dir === "asc" ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
        />
      </svg>
    );
  };

  const alignClass = (a?: Column["align"]) =>
    a === "right" ? "text-right" : a === "center" ? "text-center" : "text-left";

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "방금 전";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}시간 전`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)}일 전`;

    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-gray-300 bg-white shadow-[0_1px_0_rgba(0,0,0,0.03)]">
      <div className="w-full">
        <div className="border-b border-gray-300/60 bg-gray-100">
          <div className="table w-full table-fixed">
            <div className="table-row">
              {columns.map((col) => (
                <div
                  key={col.key}
                  className={`table-cell ${col.width} px-3 py-2.5 text-lg text-gray-600 ${alignClass(col.align)}`}
                >
                  {col.key === "select" ? (
                    <input
                      type="checkbox"
                      aria-label="전체 선택"
                      checked={allChecked}
                      ref={(el) => {
                        if (el) el.indeterminate = someChecked;
                      }}
                      onChange={(e) => toggleAll(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-gray-700 focus:ring-gray-300"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleSortClick(col)}
                      className="inline-flex cursor-pointer items-center gap-1 text-base font-semibold text-gray-600 hover:text-black"
                      disabled={!col.sortable}
                    >
                      {col.label}
                      {sortIcon(col)}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="table w-full table-fixed">
          {data.length ? (
            data.map((row) => (
              <div
                key={row.reportId}
                className="table-row border-b border-gray-100/80 transition-colors hover:bg-gray-50/50"
              >
                {columns.map((col) => {
                  const cellBase =
                    "table-cell bg-white px-3 py-2.5 text-[14px] text-gray-900";

                  if (col.key === "select") {
                    return (
                      <div
                        key={String(col.key)}
                        className={`${cellBase} ${col.width} ${alignClass(col.align)}`}
                      >
                        <input
                          type="checkbox"
                          aria-label="행 선택"
                          checked={selectedIds.includes(row.reportId)}
                          onChange={(e) =>
                            toggleRow(row.reportId, e.target.checked)
                          }
                          className="h-4 w-4 rounded border-gray-300 text-gray-700 focus:ring-gray-300"
                        />
                      </div>
                    );
                  }

                  if (col.key === "actions") {
                    return (
                      <div
                        key={String(col.key)}
                        className={`${cellBase} ${col.width} ${alignClass(col.align)} border-b`}
                      >
                        <button
                          type="button"
                          title="삭제"
                          className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-gray-400 hover:bg-red-50 hover:text-red-500"
                          onClick={() => onDeleteOne?.(row.reportId)}
                        >
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>
                    );
                  }

                  const value = row[col.key as keyof Report];
                  let displayValue = String(value ?? "");
                  if (col.key === "createdAt") {
                    displayValue = formatDate(displayValue);
                  }

                  return (
                    <div
                      key={String(col.key)}
                      className={`${cellBase} ${col.width} ${alignClass(col.align)} border-b`}
                    >
                      <div
                        className={`truncate pr-10 ${
                          col.key === "createdAt" || col.key === "owner"
                            ? "text-center"
                            : ""
                        }`}
                        title={displayValue}
                      >
                        {col.key === "reportTitle" ? (
                          <span className="text-base font-medium text-gray-900">
                            {displayValue}
                          </span>
                        ) : col.key === "owner" ? (
                          <span className="inline-flex items-center text-base text-gray-700">
                            {displayValue}
                          </span>
                        ) : col.key === "createdAt" ? (
                          <span className="text-base text-gray-500">
                            {displayValue}
                          </span>
                        ) : (
                          <span className="text-base text-gray-700">
                            {displayValue}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))
          ) : (
            <div className="table-row">
              <div className="table-cell bg-white px-3 py-12 text-center text-gray-500">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <svg
                    className="h-8 w-8 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span className="text-base font-medium">
                    일치하는 검색 결과가 없습니다
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DataTable;
export type { Column };
