import { useThrottle } from "@/shared/common/hooks/useThrottle";
import { useCallback, useEffect, useState } from "react";

/**
 * ✅ 현재 뷰포트 너비에 따른 컬럼 개수 결정
 * - SSR 환경(window 없음)에서도 터지지 않도록 typeof window 체크
 * - Tailwind breakpoints와 동일하게 맞추는 게 중요(여기선 640/768/1024)
 */
function getColumns() {
  if (typeof window === "undefined") return 4;
  const width = window.innerWidth;
  if (width >= 1024) return 4;
  if (width >= 768) return 3;
  if (width >= 640) return 2;
  return 1;
}

/**
 * ✅ 반응형 columns 상태 훅
 * - 초기 columns는 useState initializer에서 계산(Effect에서 setState하면 경고/리렌더 위험)
 * - resize 이벤트는 throttle로 과도한 재계산 방지
 */

export const useMediaColumns = (throttleMs = 100) => {
  // ✅ mount 시 한 번 계산(SSR 안전)
  const [columns, setColumns] = useState(() => getColumns());

   // ✅ columns 갱신 함수
  const update = useCallback(() => {
    setColumns(getColumns());
  }, []);

  const throttledUpdate = useThrottle(update, throttleMs);

  useEffect(() => {
    window.addEventListener("resize", throttledUpdate);
    return () => window.removeEventListener("resize", throttledUpdate);
  }, [throttledUpdate]);

  return columns;
};
