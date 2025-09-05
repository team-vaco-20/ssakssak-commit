import mockdata from "@/mocks/data/openAi.json";
import { Analysis } from "@/app/types/commit";
import CodeDiff from "@/app/ui/report-view/main-area/commit/code-diff";
import DiagramBox from "@/app/ui/report-view/main-area/commit/diagram-box";
import Explanation from "@/app/ui/report-view/main-area/commit/explanation";

function CommitSection() {
  const commits = mockdata.commits;

  return (
    <div className="space-y-8">
      {commits.map((commit) => {
        const analyses = commit.analyses as Analysis[];

        const explanation = analyses.filter((a) => a.type === "explanation");
        const codeDiffs = analyses.filter((a) => a.type === "code-diff");
        const diagrams = analyses.filter((a) => a.type === "diagram");

        return (
          <div
            key={commit.commitId}
            className="mb-8 rounded-lg border bg-white p-6 shadow-sm"
          >
            <header className="mb-4 border-b border-gray-200 pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="mb-2 text-lg font-semibold text-gray-900">
                    💬 {commit.commitMessage}
                  </h2>
                  <div className="space-x-4 text-sm text-gray-600">
                    <span>👤 {commit.author}</span>
                    <span>
                      🕐 {new Date(commit.commitDate).toLocaleString()}
                    </span>
                    <a
                      href={commit.commitLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-100 text-blue-600 underline hover:text-blue-800"
                    >
                      {commit.commitId.substring(0, 7)}
                    </a>
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
  );
}

export default CommitSection;
