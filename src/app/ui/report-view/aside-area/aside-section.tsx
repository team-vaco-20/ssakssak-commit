import CommitList from "@/app/ui/report-view/aside-area/commit-list";

function AsideSection() {
  return (
    <aside className="flex min-w-0 basis-[30%] flex-col overflow-y-auto">
      <div className="mx-auto w-[90%] rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <section aria-labelledby="commit-list-title" className="mb-4">
          <CommitList />
        </section>
      </div>
    </aside>
  );
}

export default AsideSection;
