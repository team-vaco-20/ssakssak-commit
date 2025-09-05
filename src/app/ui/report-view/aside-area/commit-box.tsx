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
      <div className="mb-3 min-h-[40px] rounded-xl bg-blue-50 px-2 py-2 shadow-sm">
        <div className="flex flex-col">
          <div className="flex flex-row gap-2">
            <span className="text-sm text-black">[{id}]</span>
            <span className="text-[11px] text-gray-500">{date}</span>
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
