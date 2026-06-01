import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addBookmark,
  clearError,
  fetchBookmarks,
  removeBookmark,
  selectBookmarks,
  selectBookmarksError,
  selectBookmarksLoading,
  selectIsBookmarked,
} from "../store/slices/bookmarkSlice";
import { AppDispatch } from "../lib/store";

export const useBookmarks = () => {
  const dispatch = useDispatch<AppDispatch>();

  const bookmarks = useSelector(selectBookmarks);
  const loading = useSelector(selectBookmarksLoading);
  const error = useSelector(selectBookmarksError);

  useEffect(() => {
    dispatch(fetchBookmarks());
  }, [dispatch]);

  const remove = useCallback(
    (jobId: string) => dispatch(removeBookmark(jobId)),
    [dispatch],
  );

  const dismissError = useCallback(() => dispatch(clearError()), [dispatch]);

  return { bookmarks, loading, error, remove, dismissError };
};

export const useBookmarkToggle = (jobId: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const isBookmarked = useSelector(selectIsBookmarked(jobId));
  const [loading, setLoading] = useState(false); // ← local loading แทน
  const error = useSelector(selectBookmarksError);

  const toggle = useCallback(async () => {
    setLoading(true);
    try {
      if (isBookmarked) {
        await dispatch(removeBookmark(jobId)).unwrap();
      } else {
        await dispatch(addBookmark(jobId)).unwrap();
      }
    } finally {
      setLoading(false);
    }
  }, [dispatch, isBookmarked, jobId]);

  return { isBookmarked, toggle, loading, error };
};
