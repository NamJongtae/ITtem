import deleteProductWish from "../../../api/deleteProductWish";
import customAxios from "@/shared/common/utils/customAxios";
import { AxiosHeaders, AxiosResponse } from "axios";
import { ApiResponse } from "@/shared/common/types/responseTypes";

jest.mock("@/shared/common/utils/customAxios");

describe("deleteProductWish API 함수 테스트", () => {
  const mockProductId = "product123";

  const mockResponse: AxiosResponse<ApiResponse> = {
    data: { message: "상품 찜 삭제에 성공했어요." },
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

  it("DELETE 요청을 보내고 응답을 반환합니다.", async () => {
    (customAxios.delete as jest.Mock).mockResolvedValue(mockResponse);

    const result = await deleteProductWish(mockProductId);

    expect(customAxios.delete).toHaveBeenCalledWith(
      `/api/product/${mockProductId}/wish`
    );
    expect(result).toEqual(mockResponse);
  });

  it("요청 중 에러가 발생하면 예외를 던집니다.", async () => {
    const error = new Error(
      "상품 찜 삭제에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
    (customAxios.delete as jest.Mock).mockRejectedValue(error);

    await expect(deleteProductWish(mockProductId)).rejects.toThrow(
      "상품 찜 삭제에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
  });
});
