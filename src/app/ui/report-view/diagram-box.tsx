import mockdata from "@/app/data/mockData.json";

function DiagramBox() {
  return (
    <div className="min-h-[200px] rounded-[10px] border-2 border-gray-500 p-2">
      <p className="ml-2 text-xl font-bold">다이어그램</p>
      <div className="border-[1px] border-gray-300"></div>
      <p className="ml-2 text-lg">{mockdata.mockDiagram.description}</p>
    </div>
  );
}

export default DiagramBox;
