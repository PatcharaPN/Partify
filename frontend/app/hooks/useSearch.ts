// hooks/useSearch.ts
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { searchJob } from "@/app/store/slices/jobSlice";
import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";

export const useSearch = () => {
  const dispatch = useAppDispatch();

  const { searchResults, isLoading, total, totalPages, currentPage } =
    useAppSelector((state) => state.jobReducer);

  const [searchChips, setSearchChips] = useState<string[]>([]);
  const [search, setSearch] = useState("");
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
    if (!value.trim()) return;
    if (searchChips.includes(value.trim())) return;
    setSearchChips((prev) => [...prev, value.trim()]);
    handleSearch("");
    setPage(1);
  };

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
