import CommitList from "@/app/ui/report-view/aside-area/commit-list";

function AsideSection() {
  return (
    <aside className="flex min-w-0 basis-[30%] flex-col overflow-y-auto">
      <div className="mx-auto flex h-full w-[90%] flex-col rounded-[10px] bg-gray-50 p-4">
        <section aria-labelledby="commit-list-title" className="mb-4">
          <CommitList />
        </section>
      </div>
    </aside>
  );
}

export default AsideSection;
