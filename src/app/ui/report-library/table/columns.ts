import { Column } from "./data-table";

type Report = {
  reportId: string;
  reportTitle: string;
  repositoryName: string;
  owner: string;
  branchName: string;
  createdAt: string;
};

const reportLibraryColumns: Column[] = [
  { key: "select", label: "", width: "w-12", align: "center" },
  {
    key: "reportTitle",
    label: "리포트 제목",
    width: "w-80",
    align: "left",
    sortable: true,
  },
  {
    key: "repositoryName",
    label: "리포지토리 명",
    width: "w-56",
    align: "left",
    sortable: true,
  },
  {
    key: "branchName",
    label: "브랜치 명",
    width: "w-48",
    align: "left",
    sortable: true,
  },
  {
    key: "owner",
    label: "소유자",
    width: "w-28",
    align: "center",
    sortable: true,
  },
  {
    key: "createdAt",
    label: "생성일시",
    width: "w-32",
    align: "center",
    sortable: true,
  },
  { key: "actions", label: "", width: "w-12", align: "center" }, // 휴지통 크기에 맞게
];

export type { Report };
export { reportLibraryColumns };
