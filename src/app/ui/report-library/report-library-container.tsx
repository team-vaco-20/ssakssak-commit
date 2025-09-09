"use client";

import HeaderSection from "@/app/ui/report-library/header-section";
import DataTable from "@/app/ui/report-library/table/data-table";
import { reportLibraryColumns } from "@/app/ui/report-library/table/columns";
import type { Report } from "@/app/ui/report-library/table/columns";
import { useState, useMemo } from "react";
import ToolBar from "./tool-bar/tool-bar";
import EmptyReportLibraryView from "./empty-report-library-view";
import TablePagination from "./table/table-pagination";

type ReportLibraryContainerProps = {
  data: Report[];
};

const PAGE_SIZE = 10;
const INITIAL_SORT: SortState = { key: "createdAt", dir: "desc" };

type SortState = { key: keyof Report | null; dir: "asc" | "desc" };

function ReportLibraryContainer({ data = [] }: ReportLibraryContainerProps) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedReportIds, setSelectedReportIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortState>(INITIAL_SORT);

  const filteredData = useMemo(() => {
    const searchValue = searchKeyword.trim().toLowerCase();
    if (!searchValue) {
      return data;
    }

    return data.filter(({ reportTitle, repositoryName, owner, branchName }) => {
      const fields = [reportTitle, repositoryName, owner, branchName];
      return fields.some((value) => value.toLowerCase().includes(searchValue));
    });
  }, [data, searchKeyword]);

  const sorted = useMemo(() => {
    if (!sort.key) return filteredData;
    const k = sort.key;
    const arr = [...filteredData];
    arr.sort((a, b) => {
      const av =
        k === "createdAt"
          ? new Date(a[k]).getTime()
          : String(a[k]).toLowerCase();
      const bv =
        k === "createdAt"
          ? new Date(b[k]).getTime()
          : String(b[k]).toLowerCase();
      if (av < bv) return sort.dir === "asc" ? -1 : 1;
      if (av > bv) return sort.dir === "asc" ? 1 : -1;
      return 0;
    });
    return arr;
  }, [filteredData, sort]);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return sorted.slice(start, start + PAGE_SIZE);
  }, [sorted, page]);

  const handleSortChange = (next: SortState) => {
    setSort(next);
    setPage(1);
  };

  return (
    <div>
      <HeaderSection title="리포트 보관함">
        <ToolBar
          searchValue={searchKeyword}
          onSearchChange={(v) => {
            setSearchKeyword(v);
            setPage(1);
          }}
          onReset={() => {
            setSearchKeyword("");
            setSelectedReportIds([]);
            setPage(1);
            setSort(INITIAL_SORT);
          }}
          selectedReportIds={selectedReportIds}
        />
      </HeaderSection>

      {data.length > 0 ? (
        <>
          <DataTable
            columns={reportLibraryColumns}
            data={paginatedData}
            sort={sort}
            onSortChange={handleSortChange}
            selectedIds={selectedReportIds}
            onSelectionChange={setSelectedReportIds}
          />
          <TablePagination
            totalCount={filteredData.length}
            pageSize={10}
            currentPage={page}
            onPageChange={setPage}
          />
        </>
      ) : (
        <EmptyReportLibraryView />
      )}
    </div>
  );
}

export default ReportLibraryContainer;
