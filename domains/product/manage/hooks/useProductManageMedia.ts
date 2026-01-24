"use client";

import { useEffect, useState } from "react";

const QUERY = "(min-width: 640px)";

export default function useProductManageMedia() {
  const [matches, setMatches] = useState(() => {
    // 초기 값 설정, SSR/빌드 안전
    if (typeof window === "undefined") return false;
    return window.matchMedia(QUERY).matches;
  });

  useEffect(() => {
    const mql = window.matchMedia(QUERY);

    const onChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    if (mql.addEventListener) mql.addEventListener("change", onChange);
    else mql.addListener(onChange);

    return () => {
      if (mql.removeEventListener) mql.removeEventListener("change", onChange);
      else mql.removeListener(onChange);
    };
  }, []);

  return matches;
}
