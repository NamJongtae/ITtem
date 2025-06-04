import incrementProductView from "../../../api/incrementProductView";
import customAxios from "@/shared/common/utils/customAxios";
import { AxiosHeaders, AxiosResponse } from "axios";
import { IncrementProductViewResponseData } from "../../../types/responseTypes";

jest.mock("@/shared/common/utils/customAxios");

describe("incrementProductView API 함수 테스트", () => {
  const mockProductId = "product123";

  const mockResponse: AxiosResponse<IncrementProductViewResponseData> = {
    data: {
      message: "상품 조회수 갱신에 성공했어요.",
      viewCount: 42
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

  it("상품 ID를 전달하여 PATCH 요청을 보내고 응답을 반환합니다.", async () => {
    (customAxios.patch as jest.Mock).mockResolvedValue(mockResponse);

    const result = await incrementProductView(mockProductId);

    expect(customAxios.patch).toHaveBeenCalledWith(
      `/api/product/${mockProductId}/view`
    );
    expect(result).toEqual(mockResponse);
  });

  it("요청 중 에러가 발생하면 예외를 던집니다.", async () => {
    const error = new Error("상품 조회수 갱신에 실패했어요.");
    (customAxios.patch as jest.Mock).mockRejectedValue(error);

    await expect(incrementProductView(mockProductId)).rejects.toThrow(
      "상품 조회수 갱신에 실패했어요."
    );
  });
});
