import purchaseRequestConfirmation from "@/domains/product/manage/api/purchaseRequestConfirmation";
import customAxios from "@/shared/common/utils/customAxios";
import { AxiosHeaders, AxiosResponse } from "axios";
import { ApiResponse } from "@/shared/common/types/responseTypes";

jest.mock("@/shared/common/utils/customAxios");

describe("purchaseRequestConfirmation", () => {
  const mockProductId = "product123";

  const mockResponse: AxiosResponse<ApiResponse> = {
    data: {
      message: "구매 요청 확인에 성공했어요."
    },
    status: 200,
    statusText: "ok",
    headers: {},
    config: {
      headers: new AxiosHeaders()
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("productId를 포함한 PATCH 요청을 보내고 응답을 반환합니다.", async () => {
    (customAxios.patch as jest.Mock).mockResolvedValue(mockResponse);

    const result = await purchaseRequestConfirmation(mockProductId);

    expect(customAxios.patch).toHaveBeenCalledWith(
      `/api/trading/sales/${mockProductId}/purchase-request-confirmation`
    );
    expect(result).toEqual(mockResponse);
  });

  it("요청 중 에러가 발생하면 예외를 던집니다.", async () => {
    const error = new Error(
      "구매 요청 확인에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
    (customAxios.patch as jest.Mock).mockRejectedValue(error);

    await expect(purchaseRequestConfirmation(mockProductId)).rejects.toThrow(
      error
    );
  });
});
