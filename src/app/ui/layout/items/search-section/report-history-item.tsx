import { ReportHistory } from "@/app/types/context";

export default function ReportHistoryItem({
  item,
  onSelect,
}: {
  item: ReportHistory;
  onSelect: (it: ReportHistory) => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(item)}
        className="flex h-10 w-full items-center truncate px-2 text-left hover:bg-orange-300 hover:text-white"
        title={item.reportTitle}
      >
        {item.reportTitle}
      </button>
    </li>
  );
}
