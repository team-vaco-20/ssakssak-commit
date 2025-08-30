import mockdata from "@/app/data/mockData.json";

function KeyChanges() {
  return (
    <div className="mb-4 min-h-[150px] rounded-[10px] border-2 border-gray-500 p-2">
      <p className="mb-1 ml-2 text-lg font-bold">핵심 변경 사항</p>
      <div className="mb-1 border-[1px] border-gray-300"></div>
      <p className="ml-2 text-lg">{mockdata.mockCommit.changes}</p>
    </div>
  );
}

export default KeyChanges;
