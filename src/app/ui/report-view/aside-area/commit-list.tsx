import CommitBox from "@/app/ui/report-view/aside-area/commit-box";
import mockdata from "@/mocks/data/openAi.json";

function CommitList() {
  return (
    <div className="mb-4 flex min-h-[250px] flex-col">
      <p className="mb-4 text-center text-lg font-semibold text-gray-800">
        📌 커밋 리스트
      </p>
      <div className="mb-4 h-px bg-gray-200" />
      {mockdata.commits.map((commit) => (
        <CommitBox
          key={commit.commitId}
          id={commit.commitId.substring(0, 7)}
          date={commit.commitDate.substring(0, 10)}
          message={commit.commitMessage}
        />
      ))}
    </div>
  );
}

export default CommitList;
