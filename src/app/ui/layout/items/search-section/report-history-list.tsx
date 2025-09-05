import { ReportHistory } from "@/app/types/context";
import ReportHistoryItem from "@/app/ui/layout/items/search-section/report-history-item";

function ReportHistoryList({
  items,
  onSelect,
  rows = 5,
}: {
  items: ReportHistory[];
  onSelect: (item: ReportHistory) => void;
  rows?: number;
}) {
  return (
    <ul className="overflow-y-auto" style={{ height: `${rows * 40 + 10}px` }}>
      <div className="divide-y rounded">
        {items.map((item) => (
          <ReportHistoryItem key={item.id} item={item} onSelect={onSelect} />
        ))}
      </div>
    </ul>
  );
}

export default ReportHistoryList;
