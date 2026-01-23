import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

export default function useInfiniteScrollObserver({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  threshold = 0,
}: {
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  threshold?: number;
  rootMargin?: string;
}) {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: false
  });

  // ✅ inView=true 구간에서 1번만
  const firedInThisViewRef = useRef(false);

  useEffect(() => {
    if (!inView) firedInThisViewRef.current = false; // 밖으로 나가면 리셋
  }, [inView]);

  useEffect(() => {
    if (!inView) return;
    if (!hasNextPage) return;
    if (isFetchingNextPage) return;
    if (firedInThisViewRef.current) return;

    firedInThisViewRef.current = true;
    fetchNextPage();
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return { ref };
}
