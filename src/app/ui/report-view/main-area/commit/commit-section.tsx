import mockdata from "@/mocks/data/openAi.json";
import { Analysis } from "@/app/types/commit";
import CodeDiff from "@/app/ui/report-view/main-area/commit/code-diff";
import DiagramBox from "@/app/ui/report-view/main-area/commit/diagram-box";
import Explanation from "@/app/ui/report-view/main-area/commit/explanation";

function CommitSection() {
  const commits = mockdata.result.commits;

  return (
    <div>
      <div className="space-y-8">
        {commits.map((commit) => {
          const analyses = commit.analyses as Analysis[];

          const explanation = analyses.filter((a) => a.type === "explanation");
          const codeDiffs = analyses.filter((a) => a.type === "code-diff");
          const diagrams = analyses.filter((a) => a.type === "diagram");

          return (
            <div key={commit.commitId} className="bg-white p-4">
              <header className="mb-2 border-b bg-gray-200 px-6 py-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="mb-2 text-lg font-semibold text-gray-900">
                      💬 {commit.commitMessage}
                    </h2>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span>👤 {commit.author}</span>
                      <span>
                        🕐 {new Date(commit.commitDate).toLocaleString()}
                      </span>
                      <span className="rounded bg-gray-200 px-2 py-1 font-mono text-xs">
                        {commit.commitId.substring(0, 7)}
                      </span>
                    </div>
                  </div>
                </div>
              </header>

              <Explanation data={explanation} />
              <CodeDiff data={codeDiffs} />
              <DiagramBox data={diagrams} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CommitSection;
