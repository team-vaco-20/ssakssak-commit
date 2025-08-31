import CommitList from "./commit-list";
import RequirementList from "./requirement-list";

function AsideSection() {
  return (
    <aside className="flex min-w-0 basis-[30%] flex-col overflow-y-auto">
      <div className="mx-auto flex h-full w-[90%] flex-col rounded-[10px] border-2 border-gray-500 bg-white p-4">
        <section aria-labelledby="commit-list-title" className="mb-4">
          <CommitList />
        </section>
        <section aria-labelledby="requirement-list-title">
          <RequirementList />
        </section>
      </div>
    </aside>
  );
}

export default AsideSection;
