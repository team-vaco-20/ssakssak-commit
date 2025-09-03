import { CommitInfo } from "@/app/types/mock_commitInfo";

function CommitBox({ id, message }: CommitInfo) {
  return (
    <>
      <div className="mb-3 min-h-[40px] rounded-[10px] border-2 border-gray-500 px-4 py-2">
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">{id}</span>
          <div className="mb-2 border-[1px] border-gray-300"></div>
          <span className="text-sm">{message}</span>
        </div>
      </div>
      <div className="mb-2 border-[1px] border-gray-300"></div>
    </>
  );
}

export default CommitBox;
