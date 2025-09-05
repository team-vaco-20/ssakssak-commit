"use client";

import { usePathname } from "next/navigation";
import { ClipboardCheckIcon } from "lucide-react";
import NavLink from "@/app/ui/layout/items/nav-link";
import ReportHistoryPanel from "@/app/ui/layout/items/search-section/report-history-panel";

function NavLinks() {
  const currentPath = usePathname();
  const showHistoryList = currentPath === "/";

  return (
    <>
      <NavLink href={"/"} label={"리포트 생성"}>
        <ClipboardCheckIcon className="w-6" />
      </NavLink>

      {showHistoryList && <ReportHistoryPanel />}

      <NavLink href={"/reports"} label={"리포트 결과 보관함"}>
        <ClipboardCheckIcon className="w-6" />
      </NavLink>
    </>
  );
}

export default NavLinks;
