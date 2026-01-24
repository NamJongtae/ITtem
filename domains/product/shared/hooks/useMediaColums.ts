"use client";

import { useEffect, useState } from "react";

function getColumnsFromWidth(width: number) {
  if (width >= 1024) return 4;
  if (width >= 768) return 3;
  if (width >= 640) return 2;
  return 1;
}

/**
 * ✅ matchMedia 기반 columns 훅
 * - resize 이벤트를 매번 듣지 않고,
 * - breakpoint를 "넘나드는 순간"에만 columns를 갱신
 */
export function useMediaColumns() {
  // ✅ SSR 안전 + 초기값은 현재 width로부터 계산
  const [columns, setColumns] = useState(() => {
    if (typeof window === "undefined") return 4;
    return getColumnsFromWidth(window.innerWidth);
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    // ✅ Tailwind breakpoints 기준
    const mqlLg = window.matchMedia("(min-width: 1024px)");
    const mqlMd = window.matchMedia("(min-width: 768px)");
    const mqlSm = window.matchMedia("(min-width: 640px)");

    // ✅ breakpoint “change” 시에만 호출됨
    const onChange = () => {
      setColumns(getColumnsFromWidth(window.innerWidth));
    };

    const add = (mql: MediaQueryList) =>
      mql.addEventListener
        ? mql.addEventListener("change", onChange)
        : mql.addListener(onChange);

    const remove = (mql: MediaQueryList) =>
      mql.removeEventListener
        ? mql.removeEventListener("change", onChange)
        : mql.removeListener(onChange);

    // ✅ 구독
    add(mqlLg);
    add(mqlMd);
    add(mqlSm);

    // ✅ 마운트 직후 한 번 동기화
    onChange();

    // ✅ cleanup
    return () => {
      remove(mqlLg);
      remove(mqlMd);
      remove(mqlSm);
    };
  }, []);

  return columns;
}
