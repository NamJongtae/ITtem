import productReturnReject from "@/domains/product/manage/api/productReturnReject";
import customAxios from "@/shared/common/utils/customAxios";
import { AxiosHeaders, AxiosResponse } from "axios";
import { ApiResponse } from "@/shared/common/types/responseTypes";

jest.mock("@/shared/common/utils/customAxios");

describe("productReturnReject", () => {
  const mockProductId = "product123";
  const mockRejectReason = "상품이 손상되지 않았습니다.";

  const mockResponse: AxiosResponse<ApiResponse> = {
    data: {
      message: "상품 반품 요청 거절에 성공했어요."
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

  it("productId와 rejectReason을 포함하여 PATCH 요청을 보내고 응답을 반환합니다.", async () => {
    (customAxios.patch as jest.Mock).mockResolvedValue(mockResponse);

    const result = await productReturnReject(mockProductId, mockRejectReason);

    expect(customAxios.patch).toHaveBeenCalledWith(
      `/api/trading/sales/${mockProductId}/return-reject`,
      {
        rejectReason: mockRejectReason
      }
    );
    expect(result).toEqual(mockResponse);
  });

  it("요청 중 에러가 발생하면 예외를 던집니다.", async () => {
    const error = new Error(
      "반품 요청 거절에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
    (customAxios.patch as jest.Mock).mockRejectedValue(error);

    await expect(
      productReturnReject(mockProductId, mockRejectReason)
    ).rejects.toThrow(error);
  });
});
