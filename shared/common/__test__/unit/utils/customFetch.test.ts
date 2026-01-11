/** @jest-environment node */

import { customFetch, createFetch } from "@/shared/common/utils/customFetch";
import redirect from "@/shared/common/utils/redirect";
import { redirect as serverRedirect } from "next/navigation";

jest.mock("@/shared/common/utils/redirect", () => ({
  __esModule: true,
  default: jest.fn()
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn()
}));

describe("customFetch(createFetch) 테스트", () => {
  const mockClientRedirect = redirect as jest.Mock;
  const mockServerRedirect = serverRedirect as unknown as jest.Mock;

  const ORIGINAL_TEST_ENV = process.env.TEST_ENV;

  beforeEach(() => {
    jest.clearAllMocks();
    (global as any).window = {};
    global.fetch = jest.fn();
    process.env.TEST_ENV = ORIGINAL_TEST_ENV;
  });

  afterEach(() => {
    delete (global as any).window;
    process.env.TEST_ENV = ORIGINAL_TEST_ENV;
  });

  const mockFetchOnce = (response: Partial<Response> & { json?: any }) => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: response.ok ?? true,
      status: response.status ?? 200,
      headers:
        response.headers ?? new Headers({ "content-type": "application/json" }),
      json: response.json ?? jest.fn().mockResolvedValue({})
    } as any);
  };

  it("성공(200) 시 json 데이터를 반환한다.", async () => {
    const body = { hello: "world" };
    mockFetchOnce({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue(body)
    });

    const result = await customFetch<typeof body>("/api/test");

    expect(result).toEqual(body);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(mockClientRedirect).not.toHaveBeenCalled();
    expect(mockServerRedirect).not.toHaveBeenCalled();
  });

  it("response.ok가 false면 FetchError {status, message}를 throw한다.", async () => {
    mockFetchOnce({
      ok: false,
      status: 500,
      json: jest.fn().mockResolvedValue({ message: "서버 오류" })
    });

    await expect(customFetch("/api/test")).rejects.toEqual({
      status: 500,
      message: "서버 오류"
    });

    expect(mockClientRedirect).not.toHaveBeenCalled();
    expect(mockServerRedirect).not.toHaveBeenCalled();
  });

  it("에러 응답에 message가 없으면 기본 메시지로 throw한다.", async () => {
    mockFetchOnce({
      ok: false,
      status: 400,
      json: jest.fn().mockResolvedValue({})
    });

    await expect(customFetch("/api/test")).rejects.toEqual({
      status: 400,
      message: "요청에 실패했어요."
    });
  });

  it("401 + '만료된 세션이에요.' + CSR(window 존재)면 세션 쿠키 삭제 호출 후 client redirect하고 Error('SESSION_EXPIRED')를 throw한다.", async () => {
    // 1) 원 요청 (401 만료)
    mockFetchOnce({
      ok: false,
      status: 401,
      json: jest.fn().mockResolvedValue({ message: "만료된 세션이에요." })
    });

    // 2) 세션쿠키 삭제 요청 응답
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue({})
    });

    await expect(customFetch("/api/test")).rejects.toThrow("SESSION_EXPIRED");

    expect(global.fetch).toHaveBeenCalledTimes(2);

    // 세션 삭제 호출 확인
    expect((global.fetch as jest.Mock).mock.calls[1][0]).toBe(
      "/api/auth/session-cookie"
    );
    expect((global.fetch as jest.Mock).mock.calls[1][1]).toEqual({
      method: "DELETE"
    });

    // CSR이면 client redirect만 호출
    expect(mockClientRedirect).toHaveBeenCalledWith("/session-expired");
    expect(mockServerRedirect).not.toHaveBeenCalled();
  });

  it("401이지만 message가 다르면 redirect/세션삭제를 하지 않고 FetchError로 throw한다.", async () => {
    mockFetchOnce({
      ok: false,
      status: 401,
      json: jest.fn().mockResolvedValue({ message: "인증 오류" })
    });

    await expect(customFetch("/api/test")).rejects.toEqual({
      status: 401,
      message: "인증 오류"
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(mockClientRedirect).not.toHaveBeenCalled();
    expect(mockServerRedirect).not.toHaveBeenCalled();
  });

  it("CSR + TEST_ENV=SSR이면 401 만료 메시지여도 세션삭제는 하지만 client redirect는 하지 않고 Error('SESSION_EXPIRED')를 throw한다.", async () => {
    process.env.TEST_ENV = "SSR";

    // 1) 원 요청 (401 만료)
    mockFetchOnce({
      ok: false,
      status: 401,
      json: jest.fn().mockResolvedValue({ message: "만료된 세션이에요." })
    });

    // 2) 세션쿠키 삭제 요청 응답
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue({})
    });

    await expect(customFetch("/api/test")).rejects.toThrow("SESSION_EXPIRED");

    // ✅ 세션 삭제는 "항상" 호출됨
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect((global.fetch as jest.Mock).mock.calls[1][0]).toBe(
      "/api/auth/session-cookie"
    );

    // ✅ TEST_ENV=SSR이면 CSR에서도 client redirect 안 함
    expect(mockClientRedirect).not.toHaveBeenCalled();
    expect(mockServerRedirect).not.toHaveBeenCalled();
  });

  it("SSR(window 없음)에서는 401 만료 메시지면 세션 삭제 후 next/navigation redirect가 호출되고 Error('SESSION_EXPIRED')를 throw한다.", async () => {
    // ✅ SSR: window 제거
    delete (global as any).window;

    mockFetchOnce({
      ok: false,
      status: 401,
      json: jest.fn().mockResolvedValue({ message: "만료된 세션이에요." })
    });

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue({})
    });

    await expect(customFetch("/api/test")).rejects.toThrow("SESSION_EXPIRED");

    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect((global.fetch as jest.Mock).mock.calls[1][0]).toBe(
      "/api/auth/session-cookie"
    );

    expect(mockServerRedirect).toHaveBeenCalledWith("/session-expired");
    expect(mockClientRedirect).not.toHaveBeenCalled();
  });

  it("응답이 JSON이 아니어서 response.json()이 실패하면 data는 null이 되고, ok=false면 기본 메시지로 throw한다.", async () => {
    mockFetchOnce({
      ok: false,
      status: 500,
      json: jest.fn().mockRejectedValue(new Error("invalid json"))
    });

    await expect(customFetch("/api/test")).rejects.toEqual({
      status: 500,
      message: "요청에 실패했어요."
    });
  });

  it("createFetch는 baseURL을 사용해 절대 URL로 요청한다.", async () => {
    const localFetch = createFetch("http://example.com", {
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    });

    mockFetchOnce({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue({ ok: true })
    });

    await localFetch("/api/hello");

    const [calledUrl, calledOptions] = (global.fetch as jest.Mock).mock
      .calls[0];
    expect(String(calledUrl)).toBe("http://example.com/api/hello");
    expect(calledOptions.credentials).toBe("include");
    expect((calledOptions.headers as any)["Content-Type"]).toBe(
      "application/json"
    );
  });
});
