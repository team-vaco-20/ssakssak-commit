import CommitBox from "./commit-box";
import mockdata from "@/mocks/data/report.json";

function CommitList() {
  return (
    <div className="mb-4 flex min-h-[250px] flex-col">
      <p className="mb-3 text-center text-2xl">커밋 리스트</p>
      <div className="mb-3 border-[1px] border-gray-300"></div>
      {mockdata.mockCommits.map((commit) => (
        <CommitBox
          key={commit.commitId}
          id={commit.commitId}
          message={commit.commitMessage}
        />
      ))}
    </div>
  );
}

export default CommitList;
