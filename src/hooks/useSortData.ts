import { useMemo } from "react";
import { Report } from "@/app/ui/report-library/table/columns";

const useSortData = (
  data: Report[],
  sort: { key: keyof Report | null; dir: "asc" | "desc" },
) => {
  const sorted = useMemo(() => {
    if (!sort.key) return data;
    const copied = [...data];
    copied.sort((a, b) => {
      const sortKey = sort.key!;
      const aValue =
        sortKey === "createdAt"
          ? new Date(a[sortKey]).getTime()
          : String(a[sortKey]).toLowerCase();
      const bValue =
        sortKey === "createdAt"
          ? new Date(b[sortKey]).getTime()
          : String(b[sortKey]).toLowerCase();
      if (aValue < bValue) return sort.dir === "asc" ? -1 : 1;
      if (aValue > bValue) return sort.dir === "asc" ? 1 : -1;
      return 0;
    });
    return copied;
  }, [data, sort]);

  return sorted;
};

export default useSortData;
