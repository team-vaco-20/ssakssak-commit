type SearchBarParams = {
  value: string;
  onSearchChange: (value: string) => void;
};

function SearchBar({ value, onSearchChange }: SearchBarParams) {
  return (
    <label className="relative min-w-[260px] flex-1">
      <span className="sr-only">검색</span>
      <input
        type="text"
        value={value}
        placeholder="제목 / 리포지토리 / 소유자 / 브랜치명 검색"
        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-10 py-2 text-sm text-gray-800 transition outline-none focus:border-gray-300 focus:bg-white focus:ring-2 focus:ring-gray-200"
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-400">
        🔍
      </span>
    </label>
  );
}

export default SearchBar;
