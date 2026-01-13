import { renderHook, waitFor } from "@testing-library/react";
import useAddRecentProduct from "../../../hooks/useAddRecentProduct";
import { RecentProductData } from "../../../types/layoutTypes";

const mockSetItem = jest.fn();
const mockGetItem = jest.fn();

beforeEach(() => {
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
  it("recentProduct를 localStorage에 저장합니다.", async () => {
    const recentProduct: RecentProductData = {
      productId: "1",
      productName: "테스트 상품",
      productImg: "https://example.com/image.jpg"
    };

    mockGetItem.mockReturnValueOnce("[]");

    renderHook(() => useAddRecentProduct({ recentProduct, enabled: true }));

    await waitFor(() => {
      expect(mockSetItem).toHaveBeenCalledWith(
        "recentProduct",
        JSON.stringify([recentProduct])
      );
    });
  });

  it("새로운 상품이 추가되면 기존 상품목록 맨 앞에 추가됩니다.", async () => {
    const recentProduct: RecentProductData = {
      productId: "2",
      productName: "새로운 상품",
      productImg: "https://example.com/2.jpg"
    };

    const recentProductList: RecentProductData[] = [
      {
        productId: "1",
        productName: "기존 상품",
        productImg: "https://example.com/1.jpg"
      }
    ];

    mockGetItem.mockReturnValueOnce(JSON.stringify(recentProductList));

    renderHook(() => useAddRecentProduct({ recentProduct, enabled: true }));

    await waitFor(() => {
      expect(mockSetItem).toHaveBeenCalledWith(
        "recentProduct",
        JSON.stringify([recentProduct, ...recentProductList])
      );
    });
  });

  it("이미 있는 상품은 중복 제거하고 맨 앞에 추가해야 합니다.", async () => {
    const recentProduct: RecentProductData = {
      productId: "1",
      productName: "중복 상품",
      productImg: "https://example.com/dup.jpg"
    };

    const existing: RecentProductData[] = [
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
    ];

    mockGetItem.mockReturnValueOnce(JSON.stringify(existing));

    renderHook(() => useAddRecentProduct({ recentProduct, enabled: true }));

    await waitFor(() => {
      expect(mockSetItem).toHaveBeenCalledWith(
        "recentProduct",
        JSON.stringify([
          recentProduct,
          {
            productId: "2",
            productName: "다른 상품",
            productImg: "https://example.com/2.jpg"
          }
        ])
      );
    });
  });

  it("최근 상품이 10개일 경우 새 항목 추가 후 가장 오래된 항목을 제거해야 합니다.", async () => {
    const recentProduct: RecentProductData = {
      productId: "11",
      productName: "새로운 상품",
      productImg: "https://example.com/new.jpg"
    };

    const existing: RecentProductData[] = Array.from(
      { length: 10 },
      (_, i) => ({
        productId: `${i + 1}`,
        productName: `상품 ${i + 1}`,
        productImg: `https://example.com/${i + 1}.jpg`
      })
    );

    mockGetItem.mockReturnValueOnce(JSON.stringify(existing));

    renderHook(() => useAddRecentProduct({ recentProduct, enabled: true }));

    const expected = [recentProduct, ...existing.slice(0, 9)];

    await waitFor(() => {
      expect(mockSetItem).toHaveBeenCalledWith(
        "recentProduct",
        JSON.stringify(expected)
      );
    });
  });

  it("enabled=false면 아무 동작도 하지 않아야 합니다.", async () => {
    const recentProduct: RecentProductData = {
      productId: "1",
      productName: "테스트 상품",
      productImg: "https://example.com/image.jpg"
    };

    renderHook(() => useAddRecentProduct({ recentProduct, enabled: false }));

    await waitFor(() => {
      expect(mockSetItem).not.toHaveBeenCalled();
      expect(mockGetItem).not.toHaveBeenCalled();
    });
  });

  it("recentProduct가 undefined면 setItem을 호출하지 않아야 합니다.", async () => {
    renderHook(() =>
      useAddRecentProduct({ recentProduct: undefined, enabled: true })
    );

    await waitFor(() => {
      expect(mockSetItem).not.toHaveBeenCalled();
    });
  });
});
