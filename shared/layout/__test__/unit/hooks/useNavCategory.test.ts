import { act, renderHook } from "@testing-library/react";
import useNavCategory from "@/shared/layout/hooks/useNavCategory";
import { useParams } from "next/navigation";
import { CATEGORY } from "@/domains/product/shared/constants/constants";
import { ProductCategory } from "@/domains/product/shared/types/productTypes";

jest.mock("next/navigation", () => ({
  __esModule: true,
  useParams: jest.fn()
}));

describe("useNavCategory 훅 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // 기본값: categoryId = 0 (전체)
    (useParams as jest.Mock).mockReturnValue({ categoryId: "0" });
  });

  it("기본 상태는 isOpenCategory가 false여야 합니다.", () => {
    const { result } = renderHook(() => useNavCategory());
    expect(result.current.isOpenCategory).toBe(false);
  });

  it("toggleCategory는 NavCategory를 열고 닫을 수 있어야 합니다.", () => {
    const { result } = renderHook(() => useNavCategory());

    act(() => {
      result.current.toggleCategory();
    });
    expect(result.current.isOpenCategory).toBe(true);

    act(() => {
      result.current.toggleCategory();
    });
    expect(result.current.isOpenCategory).toBe(false);
  });

  it("closeCategory 호출 시 NavCategory는 닫혀야 합니다.", () => {
    const { result } = renderHook(() => useNavCategory());

    act(() => {
      result.current.toggleCategory(); // 열기
    });
    expect(result.current.isOpenCategory).toBe(true);

    act(() => {
      result.current.closeCategory();
    });
    expect(result.current.isOpenCategory).toBe(false);
  });

  it("외부 클릭 시 NavCategory는 닫혀야 합니다.", () => {
    const { result } = renderHook(() => useNavCategory());

    // 카테고리 메뉴 및 버튼 dom 요소 설정
    const categoryDiv = document.createElement("div");
    const button = document.createElement("button");
    document.body.appendChild(categoryDiv);
    document.body.appendChild(button);

    // ref 설정
    result.current.categoryRef.current = categoryDiv;
    result.current.buttonRef.current = button;

    // 열기
    act(() => {
      result.current.toggleCategory();
    });
    expect(result.current.isOpenCategory).toBe(true);

    // 외부 클릭: categoryDiv/button 둘 다 아닌 요소
    const outside = document.createElement("div");
    document.body.appendChild(outside);

    act(() => {
      outside.click(); // document click listener가 동작
    });

    expect(result.current.isOpenCategory).toBe(false);

    // cleanup
    categoryDiv.remove();
    button.remove();
    outside.remove();
  });

  it("카테고리 요소 또는 버튼 내부 클릭 시 NavCategory는 닫히지 않아야 합니다.", () => {
    const { result } = renderHook(() => useNavCategory());

    const categoryDiv = document.createElement("div");
    const button = document.createElement("button");
    document.body.appendChild(categoryDiv);
    document.body.appendChild(button);

    result.current.categoryRef.current = categoryDiv;
    result.current.buttonRef.current = button;

    act(() => {
      result.current.toggleCategory(); // 열기
    });
    expect(result.current.isOpenCategory).toBe(true);

    act(() => {
      categoryDiv.click(); // 내부 클릭
    });
    expect(result.current.isOpenCategory).toBe(true);

    act(() => {
      button.click(); // 버튼 클릭
    });
    expect(result.current.isOpenCategory).toBe(true);

    // cleanup
    categoryDiv.remove();
    button.remove();
  });

  it("currentCategory는 params.categoryId에 해당하는 CATEGORY 라벨을 반환합니다.", () => {
    const categoryId = 1;
    (useParams as jest.Mock).mockReturnValue({
      categoryId: String(categoryId)
    });

    const { result } = renderHook(() => useNavCategory());

    expect(result.current.currentCategory).toBe(CATEGORY[categoryId]);
  });

  it("categoryId가 유효하지 않으면 currentCategory는 '전체'로 fallback 됩니다.", () => {
    // 숫자 아님
    (useParams as jest.Mock).mockReturnValue({ categoryId: "abc" });
    const { result: r1 } = renderHook(() => useNavCategory());
    expect(r1.current.currentCategory).toBe(ProductCategory.전체);

    // 범위 밖
    (useParams as jest.Mock).mockReturnValue({ categoryId: "999" });
    const { result: r2 } = renderHook(() => useNavCategory());
    expect(r2.current.currentCategory).toBe(ProductCategory.전체);
  });
});
