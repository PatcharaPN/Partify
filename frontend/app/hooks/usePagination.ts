import { useCallback, useEffect, useState } from "react";

export const usePagination = <T>(items: T[], pageSize = 8) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, items.length);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages]);
  const handlePrev = useCallback(() => {
    setCurrentPage((p) => Math.max(1, p - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentPage((p) => Math.min(totalPages, p + 1));
  }, [totalPages]);

  const paginatedItems = items.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );
  return {
    currentPage,
    setCurrentPage,
    totalPages,
    start,
    end,
    handlePrev,
    handleNext,
    paginatedItems,
  };
};
