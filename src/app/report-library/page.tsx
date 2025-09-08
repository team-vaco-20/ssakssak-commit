import ReportLibraryContainer from "@/app/ui/report-library/report-library-container";
import type { Report } from "../ui/report-library/table/columns";

async function ReportLibraryPage() {
  const response = await fetch("/api/reports", {
    method: "GET",
  });

  const data: Report[] = await response.json();

  return <ReportLibraryContainer data={data} />;
}

export default ReportLibraryPage;
