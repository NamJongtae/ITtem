import { renderHook } from "@testing-library/react";
import useAddRecentProduct from "../../../hooks/useAddRecentProduct";
import { RecentProductData } from "../../../types/layoutTypes";

const mockSetItem = jest.fn();
const mockGetItem = jest.fn();

beforeEach(() => {
  // localStorage mock 설정
  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: mockGetItem,
      setItem: mockSetItem
    },
    writable: true
  });

  mockSetItem.mockClear();
  mockGetItem.mockClear();
});

describe("useAddRecentProduct", () => {
  it("recentProductData를 localStorage에 저장한다", () => {
    const recentProductData: RecentProductData = {
      productId: "1",
      productName: "테스트 상품",
      productImg: "https://example.com/image.jpg"
    };

    // 기존에 최근 본 상품이 없다고 가정
    mockGetItem.mockReturnValueOnce("[]");

    renderHook(() => useAddRecentProduct(recentProductData));

    expect(mockSetItem).toHaveBeenCalledWith(
      "recentProduct",
      JSON.stringify([
        {
          productId: "1",
          productName: "테스트 상품",
          productImg: "https://example.com/image.jpg"
        }
      ])
    );
  });

  it("새로운 상품이 추가되면 기존 상품목록 맨 앞에 추가된다.", () => {
    const recentProductData: RecentProductData = {
      productId: "2",
      productName: "새로운 상품",
      productImg: "https://example.com/2.jpg"
    };

    const recentProductList = [
      {
        productId: "1",
        productName: "기존 상품",
        productImg: "https://example.com/1.jpg"
      }
    ];

    const existing = JSON.stringify(recentProductList);

    mockGetItem.mockReturnValueOnce(existing);

    renderHook(() => useAddRecentProduct(recentProductData));

    expect(mockSetItem).toHaveBeenCalledWith(
      "recentProduct",
      JSON.stringify([recentProductData, ...recentProductList])
    );
  });

  it("이미 있는 상품은 중복 제거하고 맨 앞에 추가해야 한다", () => {
    const recentProductData: RecentProductData = {
      productId: "1",
      productName: "중복 상품",
      productImg: "https://example.com/dup.jpg"
    };

    const existing = JSON.stringify([
      {
        productId: "1",
        productName: "중복 상품",
        productImg: "https://example.com/dup.jpg"
      },
      {
        productId: "2",
        productName: "다른 상품",
        productImg: "https://example.com/2.jpg"
      }
    ]);

    mockGetItem.mockReturnValueOnce(existing);

    renderHook(() => useAddRecentProduct(recentProductData));

    expect(mockSetItem).toHaveBeenCalledWith(
      "recentProduct",
      JSON.stringify([
        {
          productId: "1",
          productName: "중복 상품",
          productImg: "https://example.com/dup.jpg"
        },
        {
          productId: "2",
          productName: "다른 상품",
          productImg: "https://example.com/2.jpg"
        }
      ])
    );
  });

  it("최근 상품이 10개일 경우 새 항목 추가 후 가장 오래된 항목을 제거해야 한다", () => {
    const recentProduct: RecentProductData = {
      productId: "11",
      productName: "새로운 상품",
      productImg: "https://example.com/new.jpg"
    };

    const existing = Array.from({ length: 10 }, (_, i) => ({
      productId: `${i + 1}`,
      productName: `상품 ${i + 1}`,
      productImg: `https://example.com/${i + 1}.jpg`
    }));

    mockGetItem.mockReturnValueOnce(JSON.stringify(existing));

    renderHook(() => useAddRecentProduct(recentProduct));

    const expected = [
      {
        productId: "11",
        productName: "새로운 상품",
        productImg: "https://example.com/new.jpg"
      },
      ...existing.slice(0, 9) // 오래된 마지막 항목 제거됨
    ];

    expect(mockSetItem).toHaveBeenCalledWith(
      "recentProduct",
      JSON.stringify(expected)
    );
  });

  it("productDetailData가 undefined면 아무 동작도 하지 않아야 한다", () => {
    renderHook(() => useAddRecentProduct(undefined));

    expect(mockSetItem).not.toHaveBeenCalled();
  });
});
