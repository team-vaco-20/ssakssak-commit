import CommitBox from "@/app/ui/report-view/aside-area/commit-box";
import mockdata from "@/mocks/data/openAi.json";

function CommitList() {
  return (
    <div className="flex flex-col">
      <h3
        id="commit-list-title"
        className="mb-4 text-xl font-bold text-gray-900"
      >
        📌 커밋 리스트
      </h3>
      <div className="mb-4 h-px bg-gray-200" />
      <div className="space-y-4">
        {mockdata.commits.map((commit) => (
          <CommitBox
            key={commit.commitId}
            id={commit.commitId.substring(0, 7)}
            date={commit.commitDate.substring(0, 10)}
            message={commit.commitMessage}
            commitId={commit.commitId}
          />
        ))}
      </div>
    </div>
  );
}

export default CommitList;
