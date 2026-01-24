"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useScrollMargin } from "./useScrollMargin";
import { useMediaColumns } from "./useMediaColums";

/**
 * ✅ useProductListVirtualizer 훅 기능
 * - 반응형 columns(1~4)에 맞춰 "row(행) 단위"로 window virtualizer를 구성한다.
 * - scrollMargin(리스트 시작 Y 오프셋)을 계산해, window 기준 좌표를 리스트 컨테이너 기준으로 보정한다.
 * - estimateSize는 fallback(추정치)로만 두고, 실제 row 높이는 measureElement로 측정해 정확히 맞출 수 있게 한다.
 *
 * ✅ 왜 'row 단위' 가상화인가?
 * - grid는 아이템 단위로 가상화하면 배치가 매우 복잡해진다.
 * - 그래서 "한 row에 columns개"로 묶어 렌더링한다.
 *   rowCount = ceil(itemCount / columns)
 *
 * ✅ 반환값 구성
 * - listRef: scrollMargin 측정을 위한 컨테이너 ref
 * - columns / rowCount: row slicing에 필요한 레이아웃 값
 * - virtualizer / virtualItems / totalSize: 렌더링에 필요한 virtual 결과
 * - getRowStyle(start): translateY 보정(virtualRow.start - scrollMargin)을 재사용하기 위한 helper
 */

type Options = {
  gap?: number;
  overscan?: number;
  throttleMs?: number;
};

export function useProductListVirtualizer(
  itemCount: number,
  options: Options = {}
) {
  const { gap = 20, overscan = 2, throttleMs = 100 } = options;

  /**
   * ✅ listRef: 리스트 컨테이너 ref
   * - useWindowVirtualizer는 "window 스크롤 좌표계"를 사용한다.
   * - 리스트가 페이지 중간에서 시작하면 좌표계를 보정해야 하는데,
   * - 그 보정값(scrollMargin)을 구하기 위해 listRef가 필요하다.
   */
  const listRef = useRef<HTMLDivElement | null>(null);

  /**
   * ✅ columns: 반응형 컬럼 수(1~4)
   * - 화면 크기에 따라 row에 들어갈 아이템 개수가 달라진다.
   * - columns 변경은 rowCount, fallbackRowHeight, slicing 방식 등 전체 구조에 영향을 줌.
   */
  const columns = useMediaColumns();

  /**
   * ✅ rowCount: "행(row)" 개수
   * - 한 row에 columns개씩 들어가므로:
   *   rowCount = ceil(itemCount / columns)
   */
  const rowCount = useMemo(
    () => Math.ceil(itemCount / columns),
    [itemCount, columns]
  );

  /**
   * ✅ fallbackRowHeight: estimateSize에 넣을 "초기 추정치"
   *
   * 왜 fallback이 필요한가?
   * - measureElement를 달아 실제 높이를 측정하더라도,
   *   "첫 렌더" 시점에는 아직 측정값이 없을 수 있다.
   * - 그때도 전체 높이(totalSize)를 만들기 위해 대략적인 row 높이가 필요하다.
   */
  const fallbackRowHeight = useMemo(() => {
    const CONTENT_H = 86;
    const BORDER_Y = 2;
    const imgH =
      columns === 4 ? 200 : columns === 3 ? 220 : columns === 2 ? 240 : 280;

    return imgH + CONTENT_H + BORDER_Y;
  }, [columns]);

  /**
   * ✅ scrollMargin: 리스트 컨테이너의 문서(document) 기준 top 위치
   * - virtualRow.start는 window 기준 좌표(스크롤 포함)로 계산된다.
   * - 하지만 row는 list 컨테이너 내부에서 absolute+translateY로 배치한다.
   * - 그래서 translateY를 줄 때, "리스트 시작 위치"만큼 빼서 컨테이너 좌표계로 맞춰야 한다.
   *
   * 즉:
   * - window 좌표계: virtualRow.start
   * - 컨테이너 좌표계: virtualRow.start - scrollMargin
   */
  const { scrollMargin } = useScrollMargin(listRef, throttleMs);

  /**
   * count: row 개수
   * estimateSize: 측정 전 fallback(추정치)
   * gap: row 사이 간격(실제 grid gap과 동일 의미)
   * overscan: 화면 밖 미리 렌더할 row 수
   * scrollMargin: 리스트가 페이지 중간부터 시작하는 경우 좌표 보정
   */
  const virtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: () => fallbackRowHeight,
    gap,
    overscan,
    scrollMargin
  });

  // ✅ columns 변경 시 전체 재측정(measure)
  useEffect(() => {
    virtualizer.measure();
  }, [columns, virtualizer]);

  /**
   * ✅ virtualItems: 현재 렌더해야 하는 row 목록
   * - virtualRow.index: row 번호(0..rowCount-1)
   * - virtualRow.start: window 기준 시작 Y
   * - virtualRow.size: row 높이(estimate 또는 measure 결과)
   */
  const virtualItems = virtualizer.getVirtualItems();

  /**
   * ✅ totalSize: 전체 가상 스크롤 영역 높이
   * - 이 값을 ul의 height로 잡아야 스크롤이 자연스럽게 생긴다.
   */
  const totalSize = virtualizer.getTotalSize();

  /**
   * ✅ getRowStyle: translateY 보정 helper
   * - 매 렌더마다 inline 객체 생성이 많아질 수 있어 함수로 제공
   * - 핵심 보정식: virtualRow.start - scrollMargin
   */
  const getRowStyle = useCallback(
    (start: number) => ({
      transform: `translateY(${start - scrollMargin}px)`
    }),
    [scrollMargin]
  );

  return {
    listRef,
    columns,
    rowCount,
    scrollMargin,
    virtualizer,
    virtualItems,
    totalSize,
    getRowStyle
  };
}
