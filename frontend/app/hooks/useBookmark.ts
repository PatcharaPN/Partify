import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addBookmark,
  addBookmarkOptimistic,
  clearError,
  fetchBookmarks,
  removeBookmark,
  removeBookmarkOptimistic,
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
  const [loading, setLoading] = useState(false);
  const error = useSelector(selectBookmarksError);

  const toggle = useCallback(async () => {
    const prev = isBookmarked;

    dispatch(
      isBookmarked
        ? removeBookmarkOptimistic(jobId)
        : addBookmarkOptimistic(jobId),
    );

    try {
      if (prev) {
        await dispatch(removeBookmark(jobId)).unwrap();
      } else {
        await dispatch(addBookmark(jobId)).unwrap();
      }
    } catch {
      dispatch(
        prev ? addBookmarkOptimistic(jobId) : removeBookmarkOptimistic(jobId),
      );
    }
  }, [dispatch, isBookmarked, jobId]);

  return { isBookmarked, toggle, loading, error };
};
