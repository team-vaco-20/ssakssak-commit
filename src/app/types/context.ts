type HistoryBase = {
  reportTitle: string;
  repositoryOverview?: string;
};

type ReportHistory = HistoryBase & { id: string };
type SelectedHistory = HistoryBase | null;

export type { HistoryBase, ReportHistory, SelectedHistory };
