import editProduct from "../../../api/editProduct";
import customAxios from "@/shared/common/utils/customAxios";
import { AxiosHeaders, AxiosResponse } from "axios";
import { ProductResponseData } from "@/domains/product/shared/types/reponseTypes";
import { ProductData } from "@/domains/product/shared/types/productTypes";

jest.mock("@/shared/common/utils/customAxios");

describe("editProduct API 함수 테스트", () => {
  const mockProductId = "product123";
  const mockProductData = {
    name: "수정된 상품명",
    price: 15000
  } as ProductData;

  const mockResponse: AxiosResponse<ProductResponseData> = {
    data: {
      message: "상품 수정에 성공했어요.",
      product: {
        _id: mockProductId,
        name: "수정된 상품명",
        price: 15000
      } as ProductData
    },
    status: 200,
    statusText: "OK",
    headers: {},
    config: {
      headers: new AxiosHeaders()
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("PATCH 요청을 보내고 수정된 상품 정보를 반환해야 한다", async () => {
    (customAxios.patch as jest.Mock).mockResolvedValue(mockResponse);

    const result = await editProduct(mockProductId, mockProductData);

    expect(customAxios.patch).toHaveBeenCalledWith(
      `/api/product/${mockProductId}`,
      { productData: mockProductData }
    );
    expect(result).toEqual(mockResponse);
  });

  it("요청 중 에러가 발생하면 예외를 던져야 한다", async () => {
    const error = new Error(
      "상품 수정에 실패 했어요.\n잠시 후 다시 시도해주세요."
    );
    (customAxios.patch as jest.Mock).mockRejectedValue(error);

    await expect(editProduct(mockProductId, mockProductData)).rejects.toThrow(
      "상품 수정에 실패 했어요.\n잠시 후 다시 시도해주세요."
    );
  });
});
