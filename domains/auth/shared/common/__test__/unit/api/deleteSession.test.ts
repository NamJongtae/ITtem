import deleteSessionCookie from "../../../api/deleteSessionCookie";
import { customFetch } from "@/shared/common/utils/customFetch";

jest.mock("@/shared/common/utils/customFetch", () => ({
  customFetch: jest.fn()
}));

describe("deleteSessionCookie API 함수 테스트 (customFetch returns data)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("DELETE 요청을 보내고 응답 데이터를 그대로 반환합니다.", async () => {
    const responseData = { message: "세션 쿠키 삭제 성공" };

    // ✅ customFetch는 data를 resolve
    (customFetch as jest.Mock).mockResolvedValue(responseData);

    const result = await deleteSessionCookie();

    expect(customFetch).toHaveBeenCalledWith("/api/auth/session-cookie", {
      method: "DELETE"
    });

    expect(result).toEqual(responseData);
  });

  it("customFetch가 에러를 throw하면 동일한 에러를 전파합니다.", async () => {
    const fetchError = {
      status: 500,
      message: "세션 쿠키 삭제에 실패했어요."
    };

    // ✅ 실패 시 reject
    (customFetch as jest.Mock).mockRejectedValue(fetchError);

    await expect(deleteSessionCookie()).rejects.toEqual(fetchError);
  });
});
