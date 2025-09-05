function CommitBox({
  id,
  message,
  date,
}: {
  id: string;
  message: string;
  date: string;
}) {
  return (
    <>
      <div className="mb-3 rounded-md border border-blue-100 bg-blue-50 px-4 py-3 shadow-sm">
        <div className="flex flex-col">
          <div className="mr-2 mb-2 flex items-center justify-between text-sm text-gray-700">
            <span className="font-mono text-blue-600">[{id}]</span>
            <span className="text-xs text-gray-500">{date}</span>
          </div>

          <div className="mb-2 border-[1px] border-gray-300"></div>
          <span className="truncate rounded-xl bg-gray-50 px-0 py-4 text-center text-xs">
            {message}
          </span>
        </div>
      </div>
      <div className="mb-2 border-[1px] border-gray-200"></div>
    </>
  );
}

export default CommitBox;
