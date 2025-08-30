import mockdata from "@/mocks/data/report.json";

function Header() {
  return (
    <header className="flex h-[4rem] items-center px-4">
      <h1 className="p-3 text-2xl font-bold">
        {mockdata.mockTitle.reportTitle}
      </h1>
    </header>
  );
}

export default Header;
