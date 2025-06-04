import uploadProduct from "@/domains/product/upload/api/uploadProduct";
import customAxios from "@/shared/common/utils/customAxios";
import { ProductUploadData } from "../../../types/productUploadTypes";
import { ProductResponseData } from "@/domains/product/shared/types/reponseTypes";
import { AxiosHeaders, AxiosResponse } from "axios";
import { ProductData } from "@/domains/product/shared/types/productTypes";

jest.mock("@/shared/common/utils/customAxios");

describe("uploadProduct", () => {
  const mockProductData = {
    name: "테스트 상품",
    description: "설명입니다.",
    price: 10000
  } as ProductUploadData;

  const mockResponse: AxiosResponse<ProductResponseData> = {
    data: {
      message: "상품 등록에 성공했어요.",
      product: {
        _id: "product123",
        name: "테스트 상품"
      } as ProductData
    },
    status: 201,
    statusText: "Created",
    headers: {},
    config: {
      headers: new AxiosHeaders()
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("상품 데이터를 POST 요청으로 전송하고 응답을 반환합니다.", async () => {
    (customAxios.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await uploadProduct(mockProductData);

    expect(customAxios.post).toHaveBeenCalledWith("/api/product/upload", {
      productData: mockProductData
    });
    expect(result).toEqual(mockResponse);
  });

  it("API 요청 중 에러가 발생하면 예외를 던집니다.", async () => {
    const error = new Error(
      "상품 등록에 실패하였어요.\n잠시 후 다시 시도해주세요."
    );
    (customAxios.post as jest.Mock).mockRejectedValue(error);

    await expect(uploadProduct(mockProductData)).rejects.toThrow(
      "상품 등록에 실패하였어요.\n잠시 후 다시 시도해주세요."
    );
  });
});
