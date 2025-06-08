import { renderHook } from "@testing-library/react";
import useInitializeFormData from "../../../hooks/useInitializeFormData";
import { useFormContext } from "react-hook-form";
import {
  ProductCategory,
  ProductCondition,
  ProductData,
  ProductSellType,
  ProductTransaction
} from "@/domains/product/shared/types/productTypes";

jest.mock("react-hook-form");

describe("useInitializeFormData 훅 테스트", () => {
  const mockReset = jest.fn();
  const mockUseFormContext = useFormContext as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseFormContext.mockReturnValue({
      reset: mockReset
    });
  });

  it("productData가 주어졌을 때 reset이 올바르게 호출됩니다.", () => {
    const productData = {
      imgData: [
        { url: "img1.jpg", name: "https://storage.com/img1.jpg" },
        { url: "img2.jpg", name: "https://storage.com/img2.jpg" }
      ],
      name: "상품명",
      sellType: ProductSellType.중고거래,
      category: ProductCategory.의류,
      location: "서울",
      condition: ProductCondition.A,
      returnPolicy: "가능",
      transaction: ProductTransaction.모두,
      deliveryFee: "포함",
      price: 10000,
      description: "상품 설명"
    } as ProductData;

    renderHook(() => useInitializeFormData(productData));

    expect(mockReset).toHaveBeenCalledWith({
      imgData: productData.imgData,
      prevImgData: productData.imgData,
      name: productData.name,
      sellType: productData.sellType,
      category: productData.category,
      location: productData.location,
      condition: productData.condition,
      returnPolicy: productData.returnPolicy,
      transaction: productData.transaction,
      deliveryFee: productData.deliveryFee,
      price: productData.price.toString(),
      description: productData.description
    });
  });

  it("productData가 없을 경우 reset이 호출되지 않습니다.", () => {
    renderHook(() => useInitializeFormData(undefined));
    expect(mockReset).not.toHaveBeenCalled();
  });
});
