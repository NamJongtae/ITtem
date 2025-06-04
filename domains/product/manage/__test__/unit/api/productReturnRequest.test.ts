import productReturnRequest from "@/domains/product/manage/api/productReturnRequest";
import customAxios from "@/shared/common/utils/customAxios";
import { AxiosHeaders, AxiosResponse } from "axios";
import { ApiResponse } from "@/shared/common/types/responseTypes";

jest.mock("@/shared/common/utils/customAxios");

describe("productReturnRequest", () => {
  const mockProductId = "product123";
  const mockReturnReason = "상품이 설명과 달라요.";

  const mockResponse: AxiosResponse<ApiResponse> = {
    data: {
      message: "상품 반품 요청에 성공했어요."
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

  it("productId와 returnReason을 포함하여 PATCH 요청을 보내고 응답을 반환합니다.", async () => {
    (customAxios.patch as jest.Mock).mockResolvedValue(mockResponse);

    const result = await productReturnRequest(mockProductId, mockReturnReason);

    expect(customAxios.patch).toHaveBeenCalledWith(
      `/api/trading/purchase/${mockProductId}/return`,
      {
        returnReason: mockReturnReason
      }
    );
    expect(result).toEqual(mockResponse);
  });

  it("요청 중 에러가 발생하면 예외를 던집니다.", async () => {
    const error = new Error(
      "상품 반품 요청에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
    (customAxios.patch as jest.Mock).mockRejectedValue(error);

    await expect(
      productReturnRequest(mockProductId, mockReturnReason)
    ).rejects.toThrow(error);
  });
});
