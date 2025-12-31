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
  const mockResetField = jest.fn();
  const mockUseFormContext = useFormContext as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseFormContext.mockReturnValue({
      resetField: mockResetField
    });
  });

  it("productData가 주어졌을 때 각 필드에 대해 resetField가 올바르게 호출됩니다.", () => {
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
    } as ProductData;;

    renderHook(() => useInitializeFormData(productData));

    expect(mockResetField).toHaveBeenCalledWith("imgData", {
      defaultValue: productData.imgData
    });

    expect(mockResetField).toHaveBeenCalledWith("prevImgData", {
      defaultValue: productData.imgData
    });

    expect(mockResetField).toHaveBeenCalledWith("name", {
      defaultValue: productData.name
    });

    expect(mockResetField).toHaveBeenCalledWith("sellType", {
      defaultValue: productData.sellType
    });

    expect(mockResetField).toHaveBeenCalledWith("category", {
      defaultValue: productData.category
    });

    expect(mockResetField).toHaveBeenCalledWith("location", {
      defaultValue: productData.location
    });

    expect(mockResetField).toHaveBeenCalledWith("condition", {
      defaultValue: productData.condition
    });

    expect(mockResetField).toHaveBeenCalledWith("returnPolicy", {
      defaultValue: productData.returnPolicy
    });

    expect(mockResetField).toHaveBeenCalledWith("transaction", {
      defaultValue: productData.transaction
    });

    expect(mockResetField).toHaveBeenCalledWith("deliveryFee", {
      defaultValue: productData.deliveryFee
    });

    expect(mockResetField).toHaveBeenCalledWith("price", {
      defaultValue: productData.price.toString()
    });

    expect(mockResetField).toHaveBeenCalledWith("description", {
      defaultValue: productData.description
    });

    // 총 호출 횟수까지 검증하면 더 명확
    expect(mockResetField).toHaveBeenCalledTimes(12);
  });

  it("productData가 없을 경우 resetField가 호출되지 않습니다.", () => {
    renderHook(() => useInitializeFormData(undefined));
    expect(mockResetField).not.toHaveBeenCalled();
  });
});
