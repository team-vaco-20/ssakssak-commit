import Link from "next/link";
import { Button } from "@/app/ui/common/button";

function EmptyReportLibraryView() {
  return (
    <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
      <p className="text-2xl font-semibold">아직 저장된 리포트가 없습니다.</p>
      <p className="mt-2 text-gray-600">
        리포트를 생성하고 분석 결과를 보관함에서 관리해보세요.
      </p>
      <div className="mt-6">
        <Link href="/">
          <Button className="cursor-pointer px-5 py-2">
            ➕ 리포트 생성하기
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default EmptyReportLibraryView;
