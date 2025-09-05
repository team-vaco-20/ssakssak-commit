import mockdata from "@/mocks/data/openAi.json";

function Header() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6">
      <header className="border-b pb-4">
        <h1 className="mb-10 text-3xl font-bold text-gray-900">
          🧪 {mockdata.result.reportTitle}
        </h1>
      </header>
    </div>
  );
}

export default Header;
