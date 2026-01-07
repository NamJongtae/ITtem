// domains/auth/shared/common/__test__/unit/api/destoryDBSession.test.ts

import destoryDBSession from "../../../api/destoryDBSession";
import { customFetch } from "@/shared/common/utils/customFetch";

jest.mock("@/shared/common/utils/customFetch", () => ({
  customFetch: jest.fn()
}));

describe("destoryDBSession API 함수 테스트 (customFetch returns data)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("DELETE 요청을 보내고 성공 메시지를 반환합니다.", async () => {
    const email = "test@example.com";
    const body = { message: "세션 ID 삭제 성공" };

    // ✅ customFetch는 data를 resolve
    (customFetch as jest.Mock).mockResolvedValue(body);

    const result = await destoryDBSession(email);

    expect(customFetch).toHaveBeenCalledWith("/api/auth/destory-db-session", {
      method: "DELETE",
      body: JSON.stringify({ email })
    });

    expect(result).toEqual(body);
  });

  it("유저 이메일이 전달되지 않으면(422) customFetch 에러를 그대로 전파합니다.", async () => {
    const fetchError = { status: 422, message: "유저 이메일이 없어요." };

    // ✅ 실패는 reject
    (customFetch as jest.Mock).mockRejectedValue(fetchError);

    await expect(destoryDBSession("")).rejects.toEqual(fetchError);
  });

  it("유저가 존재하지 않으면(404) customFetch 에러를 그대로 전파합니다.", async () => {
    const email = "no-user@test.com";
    const fetchError = { status: 404, message: "존재하지 않는 유저입니다." };

    (customFetch as jest.Mock).mockRejectedValue(fetchError);

    await expect(destoryDBSession(email)).rejects.toEqual(fetchError);
  });

  it("삭제할 세션이 없으면(404) customFetch 에러를 그대로 전파합니다.", async () => {
    const email = "user@test.com";
    const fetchError = {
      status: 404,
      message: "삭제할 세션이 존재하지 않습니다."
    };

    (customFetch as jest.Mock).mockRejectedValue(fetchError);

    await expect(destoryDBSession(email)).rejects.toEqual(fetchError);
  });

  it("서버 에러(500)도 customFetch 에러를 그대로 전파합니다.", async () => {
    const email = "user@test.com";
    const fetchError = { status: 500, message: "세션 ID 삭제에 실패했어요." };

    (customFetch as jest.Mock).mockRejectedValue(fetchError);

    await expect(destoryDBSession(email)).rejects.toEqual(fetchError);
  });
});
