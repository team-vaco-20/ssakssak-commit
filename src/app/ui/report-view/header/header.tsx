import mockdata from "@/mocks/data/openAi.json";

function Header() {
  return (
    <div className="mb-2 w-full px-2">
      <header className="flex h-[100px] flex-col justify-between">
        <h1 className="text-left text-4xl font-extrabold tracking-tight text-gray-900">
          🧪 {mockdata.reportTitle}
        </h1>
        <div className="flex flex-wrap items-center space-x-4 text-sm">
          <a
            href={mockdata.repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-500 transition-colors duration-200 hover:text-blue-700"
          >
            {mockdata.repositoryUrl}
          </a>
          <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
            🌳 {mockdata.branch}
          </span>
        </div>
      </header>
    </div>
  );
}

export default Header;
