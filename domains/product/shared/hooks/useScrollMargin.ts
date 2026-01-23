import { useThrottle } from "@/shared/common/hooks/useThrottle";
import { useCallback, useLayoutEffect, useState } from "react";

/**
 * ✅ useScrollMargin 훅 기능
 * - "window 기준 좌표계"로 계산되는 virtualRow.start 값을,
 *   "리스트 컨테이너 내부 좌표계"로 바꿔주기 위한 보정값(scrollMargin)을 계산한다.
 *
 * ✅ scrollMargin이란?
 * - 문서(document) 기준으로 "리스트 컨테이너의 시작 Y 위치"를 의미한다.
 * - 계산식:
 *   scrollMargin = (컨테이너의 viewport 기준 top) + (현재 window scrollY)
 *
 * ✅ 왜 필요한가?
 * - useWindowVirtualizer는 virtualRow.start를 "window 스크롤 좌표계" 기준으로 제공한다.
 * - 하지만 우리는 <li>들을 list 컨테이너 안에서 absolute로 배치하고 translateY를 주기 때문에
 *   리스트 컨테이너 기준 좌표로 맞춰야 한다.
 * - 따라서 최종 배치는:
 *   transform: translateY(virtualRow.start - scrollMargin)
 *
 * ✅ 언제 값이 달라지나?
 * - 리사이즈로 인해 레이아웃이 바뀌면(헤더 높이, 래핑, 마진 등) 컨테이너의 top 위치도 달라질 수 있다.
 * - 그래서 resize 이벤트에서 다시 측정해준다.
 */
export const useScrollMargin = <T extends HTMLElement>(
  /** ✅ scrollMargin을 계산할 "리스트 컨테이너" ref */
  listRef: React.RefObject<T | null>,
  /** ✅ resize 이벤트가 잦으므로 throttle로 비용을 줄인다 */
  throttleMs = 100
) => {
  /**
   * ✅ scrollMargin 상태
   * - list 컨테이너가 문서 기준으로 어디서 시작하는지 저장
   * - (window virtualizer의 start 좌표를 컨테이너 좌표로 바꾸는 핵심값)
   */
  const [scrollMargin, setScrollMargin] = useState(0);

  /**
   * ✅ scrollMargin 갱신 함수
   * - getBoundingClientRect().top: "현재 뷰포트 기준" 컨테이너 top
   * - window.scrollY: "문서 기준" 현재 스크롤 위치
   * - 둘을 더하면 "문서 기준 컨테이너 absolute top"이 된다.
   */
  const updateScrollMargin = useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    setScrollMargin(el.getBoundingClientRect().top + window.scrollY);
  }, [listRef]);

  /**
   * ✅ resize 이벤트는 연속으로 많이 발생할 수 있으니 throttle 적용
   * - 너무 자주 setState하면 레이아웃 계산/리렌더 비용이 커질 수 있음
   */
  const throttledUpdate = useThrottle(updateScrollMargin, throttleMs);

  /**
   * ✅ useLayoutEffect를 쓰는 이유
   * - DOM 레이아웃 값을(getBoundingClientRect) 읽고 즉시 상태로 반영해야 한다.
   * - paint 이후에 반영되면(=useEffect) 첫 프레임에서 translateY가 어긋나
   *   "한 프레임 점프" 같은 깜빡임이 생길 수 있다.
   *
   * ✅ 여기서는 resize만 구독
   * - scrollY(스크롤) 자체가 바뀌는 건 scrollMargin이 아니라 virtualRow.start가 해결한다.
   * - scrollMargin은 "컨테이너 시작 위치"가 바뀌는 경우(리사이즈/상단 레이아웃 변화)에만 주로 필요.
   */
  useLayoutEffect(() => {
    // ✅ 최초 1회 즉시 측정(마운트 직후)
    updateScrollMargin();

    // ✅ 리사이즈 시 컨테이너 top 위치가 바뀔 수 있으므로 재측정
    window.addEventListener("resize", throttledUpdate);

    // ✅ 클린업
    return () => window.removeEventListener("resize", throttledUpdate);
  }, [updateScrollMargin, throttledUpdate]);

  /** ✅ 외부에서 사용할 보정값 반환 */
  return { scrollMargin };
};
