import ReportForm from "@/app/ui/main/report-form";
import Header from "@/app/ui/common/header";

function HomePage() {
  return (
    <div className="px-[10%]">
      <Header
        title="🧹싹싹커밋"
        subTitlePrefix="복잡한 커밋을"
        highlight="싹싹"
        subTitleSuffix="모아서 한눈에 이해할 수 있게 도와드립니다"
      />

      <ReportForm />
    </div>
  );
}

export default HomePage;
