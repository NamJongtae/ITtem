import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface IParams {
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  threshold?: number;
}

export default function useInfiniteScrollObserver({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  threshold = 0.8
}: IParams) {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: false
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage]);

  return { ref };
}
