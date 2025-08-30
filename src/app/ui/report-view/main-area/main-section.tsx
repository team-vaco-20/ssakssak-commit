import SummarySection from "./summary/summary-box";
import CommitSection from "./commit/commit-section";

function MainSection() {
  return (
    <main className="flex min-w-0 basis-[70%] flex-col overflow-y-auto">
      <SummarySection />
      <CommitSection />
    </main>
  );
}

export default MainSection;
