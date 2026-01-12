import { renderHook, act } from "@testing-library/react";
import useWishDeleteSelector from "../../../hooks/useWishDeleteSelector";
import type { WishlistProductData } from "../../../types/profileTypes";

const mockData: WishlistProductData[] = [
  { _id: "1", name: "Product 1" } as WishlistProductData,
  { _id: "2", name: "Product 2" } as WishlistProductData,
  { _id: "3", name: "Product 3" } as WishlistProductData
];

describe("useWishDeleteSelector", () => {
  it("초기에는 선택된 찜 목록이 없습니다.", () => {
    const { result } = renderHook(() =>
      useWishDeleteSelector({ data: mockData })
    );
    expect(result.current.selectedWish).toEqual([]);
  });

  it("onClickCheckBox을 호출 시 setSelectedWish 호출하여 선택된 찜 상품이 selectWish에 추가됩니다.", () => {
    const { result } = renderHook(() =>
      useWishDeleteSelector({ data: mockData })
    );

    act(() => {
      result.current.onClickCheckBox("1");
    });

    expect(result.current.selectedWish).toEqual(["1"]);
  });

  it("onClickCheckBox을 호출 시 이미 선택된 찜 상품인 경우 setSelectedWish를 호출하여 selectWisth에서 제거됩니다.", () => {
    const { result } = renderHook(() =>
      useWishDeleteSelector({ data: mockData })
    );

    act(() => {
      result.current.onClickCheckBox("1"); // 선택
      result.current.onClickCheckBox("1"); // 해제
    });

    expect(result.current.selectedWish).toEqual([]);
  });

  it("onClickSelectAll로 전체 선택하면 모든 id가 selectWisth에 추가됩니다.", () => {
    const { result } = renderHook(() =>
      useWishDeleteSelector({ data: mockData })
    );

    act(() => {
      result.current.onClickSelectAll({
        target: { checked: true }
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.selectedWish).toEqual(["1", "2", "3"]);
  });

  it("onClickSelectAll로 전체 해제하면 selectWisth가 빈 배열로 설정됩니다.", () => {
    const { result } = renderHook(() =>
      useWishDeleteSelector({ data: mockData })
    );

    act(() => {
      // 먼저 전체 선택
      result.current.onClickSelectAll({
        target: { checked: true }
      } as React.ChangeEvent<HTMLInputElement>);
      // 해제
      result.current.onClickSelectAll({
        target: { checked: false }
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.selectedWish).toEqual([]);
  });

  it("data가 없는 경우 전체 선택을 눌러도 오류 없이 동작합니다.", () => {
    const { result } = renderHook(() =>
      useWishDeleteSelector({ data: undefined })
    );

    act(() => {
      result.current.onClickSelectAll({
        target: { checked: true }
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.selectedWish).toEqual([]);
  });
});
