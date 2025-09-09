import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/app/ui/common/pagination";

type TablePaginationProps = {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

function TablePagination({
  totalCount,
  pageSize,
  currentPage,
  onPageChange,
}: TablePaginationProps) {
  const totalPages = Math.ceil(totalCount / pageSize);
  const cur = Math.min(Math.max(currentPage, 1), totalPages);

  const win = 5;
  let start = Math.max(1, cur - 2);
  const end = Math.min(totalPages, start + win - 1);
  start = Math.max(1, end - win + 1);

  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <Pagination className="mt-7">
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious
              className="cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) onPageChange(cur - 1);
              }}
            />
          </PaginationItem>
        )}

        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={page === currentPage}
              className="cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(page);
              }}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext
              className="cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) onPageChange(currentPage + 1);
              }}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}

export default TablePagination;
