"use client";

import HeaderSection from "@/app/ui/report-library/header-section";
import DataTable from "@/app/ui/report-library/table/data-table";
import { columns } from "@/app/ui/report-library/table/columns";
import type { Report } from "@/app/ui/report-library/table/columns";
import { useState, useMemo } from "react";
import ToolBar from "./tool-bar/tool-bar";
import EmptyReportLibraryView from "./empty-report-library-view";

type ReportLibraryContainerProps = {
  data: Report[];
};

function ReportLibraryContainer({ data = [] }: ReportLibraryContainerProps) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedReportIds, setSelectedReportIds] = useState<string[]>([]);

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

  return (
    <div className="min-h-screen w-screen space-y-6 px-[10%]">
      <HeaderSection title="리포트 보관함">
        <ToolBar
          onSearchChange={(value: string) => setSearchKeyword(value)}
          selectedReportIds={selectedReportIds}
        />
      </HeaderSection>

      {data.length > 0 ? (
        <DataTable
          columns={columns}
          data={filteredData}
          getRowKey={(row) => row.reportId}
          onSelectionChange={setSelectedReportIds}
        />
      ) : (
        <EmptyReportLibraryView />
      )}
    </div>
  );
}

export default ReportLibraryContainer;
