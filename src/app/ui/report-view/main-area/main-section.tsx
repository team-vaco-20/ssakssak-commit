import SummarySection from "./summary/summary-box";
import CommitSection from "./commit/commit-section";

function MainSection() {
  return (
    <main className="flex min-w-0 flex-col space-y-6 lg:basis-[70%]">
      <SummarySection />
      <CommitSection />
    </main>
  );
}

export default MainSection;
