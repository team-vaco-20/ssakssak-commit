"use client";

import { useReportHistory } from "@/hooks/useVerifiedContext";
import Link from "next/link";

function HomeLink() {
  const { clearSelection } = useReportHistory();

  return (
    <Link
      href="/"
      className="mb-2 flex h-20 items-end justify-start rounded-md bg-orange-400 p-4 md:h-40"
      onClick={() => {
        clearSelection();
      }}
    >
      <div className="w-32 text-white md:w-40">
        <span>싹싹커밋</span>
      </div>
    </Link>
  );
}

export default HomeLink;
