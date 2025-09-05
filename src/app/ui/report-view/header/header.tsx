import mockdata from "@/mocks/data/openAi.json";

function Header() {
  return (
    <div className="mx-auto max-w-7xl border-gray-200 px-6 py-4">
      <header>
        <h1 className="mb-4 text-3xl font-semibold text-blue-600">
          🧪 {mockdata.result.reportTitle}
        </h1>
      </header>
    </div>
  );
}

export default Header;
