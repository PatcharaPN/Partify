// hooks/useSearch.ts
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { searchJob } from "@/app/store/slices/jobSlice";
import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";

export const useSearch = (
  category?: string | null,
  initialSearch?: string | null,
) => {
  const dispatch = useAppDispatch();

  const categoryMap: Record<string, string[]> = {
    creative: ["Photoshop", "Figma", "Canva"],
    retail: ["การขาย", "บริการลูกค้า"],
  };

  const mappedCategory = category ? categoryMap[category] || [] : [];
  const { searchResults, isLoading, total, totalPages, currentPage } =
    useAppSelector((state) => state.jobReducer);

  const [searchChips, setSearchChips] = useState<string[]>(mappedCategory);

  const [search, setSearch] = useState(initialSearch ?? "");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    dispatch(
      searchJob({
        search: debouncedSearch,
        skills: [...selectedTags, ...searchChips],
        page,
      }),
    );
  }, [debouncedSearch, selectedTags, searchChips, page]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
    setPage(1);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };
  const addChip = (value: string) => {
    const trimmed = value.trim();

    if (!trimmed) return;

    setSearchChips((prev) => {
      if (prev.includes(trimmed)) return prev;

      return [...prev, trimmed];
    });

    handleSearch("");
    setPage(1);
  };
  useEffect(() => {
    console.log({ total, totalPages, page });
  }, [total, totalPages]);
  const removeChip = (chip: string) => {
    setSearchChips((prev) => prev.filter((c) => c !== chip));
    setPage(1);
  };

  return {
    search,
    handleSearch,
    selectedTags,
    toggleTag,
    page,
    setPage,
    searchResults,
    isLoading,
    total,
    totalPages,
    currentPage,
    searchChips,
    addChip,
    removeChip,
  };
};
