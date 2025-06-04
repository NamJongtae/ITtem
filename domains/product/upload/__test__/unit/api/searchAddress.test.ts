import searchAddress from "../../../api/searchAddress";
import customAxios from "@/shared/common/utils/customAxios";
import { KakaoAddressDocument } from "@/domains/product/shared/types/productTypes";

jest.mock("@/shared/common/utils/customAxios");

describe("searchAddress", () => {
  const mockAddress = "서울특별시 강남구";
  const mockApiKey = "fake-kakao-api-key";

  const mockDocuments: KakaoAddressDocument[] = [
    { address_name: "서울특별시 강남구 테헤란로" } as KakaoAddressDocument,
    { address_name: "서울특별시 강남구 삼성동" } as KakaoAddressDocument
  ];

  const mockResponse = {
    data: {
      documents: mockDocuments
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY = mockApiKey;
  });

  it("주소 문자열로 Kakao 주소 검색 API를 호출하고 address_name 목록을 반환합니다.", async () => {
    (customAxios as unknown as jest.Mock).mockResolvedValue(mockResponse);

    const result = await searchAddress(mockAddress);

    expect(customAxios).toHaveBeenCalledWith(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(
        mockAddress
      )}`,
      {
        headers: {
          Authorization: `KakaoAK ${mockApiKey}`
        },
        withCredentials: false
      }
    );
    expect(result).toEqual([
      "서울특별시 강남구 테헤란로",
      "서울특별시 강남구 삼성동"
    ]);
  });

  it("요청 중 에러가 발생하면 예외를 던집니다.", async () => {
    const error = new Error("Kakao 주소 검색 실패");
    (customAxios as unknown as jest.Mock).mockRejectedValue(error);

    await expect(searchAddress(mockAddress)).rejects.toThrow(
      "Kakao 주소 검색 실패"
    );
  });
});
