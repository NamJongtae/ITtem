import type {
  AxiosInstance,
  AxiosInterceptorManager,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosError
} from "axios";

jest.mock("@/shared/common/utils/redirect", () => ({
  __esModule: true,
  default: jest.fn()
}));

jest.mock("axios", () => {
  const original = jest.requireActual("axios");

  const localInstance: Partial<AxiosInstance> & {
    _onFulfilled?: (
      res: AxiosResponse
    ) => AxiosResponse | Promise<AxiosResponse>;
    _onRejected?: (err: AxiosError) => unknown;
  } = {
    interceptors: {
      request: {
        use: jest.fn()
      } as unknown as AxiosInterceptorManager<InternalAxiosRequestConfig>,
      response: {
        use: jest.fn().mockImplementation((onSuccess, onError) => {
          localInstance._onFulfilled = onSuccess;
          localInstance._onRejected = onError;
          return 1;
        })
      } as unknown as AxiosInterceptorManager<AxiosResponse>
    },
    request: jest.fn()
  };

  return {
    ...original,
    create: jest.fn(() => localInstance),
    post: jest.fn(),
    isAxiosError: jest.fn(() => true),
    __getInstance: () => localInstance
  };
});

jest.mock("@/shared/common/utils/Observable", () => ({
  __esModule: true,
  default: {
    removeAll: jest.fn(),
    notifyAll: jest.fn(),
    setObserver: jest.fn()
  }
}));

import redirect from "@/shared/common/utils/redirect";
import * as axiosModule from "axios";
import * as customAxiosModule from "@/shared/common/utils/customAxios";
import * as tokenObservableModule from "@/shared/common/utils/Observable";

const axios = axiosModule.default;
const tokenObservable = tokenObservableModule.default;
const customAxios = customAxiosModule.default;
const instance = (axiosModule as any).__getInstance();

// ❗ 만료된 토큰 에러를 시뮬레이션하는 유틸 함수
const createExpiredTokenError = () => ({
  config: {
    headers: { Cookie: "refreshToken=abc" },
    _retry: false,
    method: "get",
    url: "/api/test"
  } as unknown as InternalAxiosRequestConfig,
  response: {
    status: 401,
    data: { message: "만료된 토큰이에요." },
    headers: {},
    config: {}
  },
  isAxiosError: jest.fn(() => true),
  toJSON: () => ({})
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe("customAxios 테스트", () => {
  it("정상적인 200 응답이면 응답을 그대로 반환한다.", async () => {
    instance.request.mockResolvedValueOnce({ data: "ok" });

    const res = await customAxios.request({ method: "get", url: "/api/test" });
    expect(res.data).toBe("ok");
  });

  it("CSR 환경에서 accessToken이 만료되었을 때, 재발급 후 원래 요청을 다시 수행한다.", async () => {
    const error = createExpiredTokenError();

    // accessToken 재발급 응답 mock
    (axios.post as jest.Mock).mockResolvedValueOnce({
      headers: { "set-cookie": ["accessToken=abc"] }
    });

    // 재요청 mock 응답
    instance.request.mockResolvedValueOnce({ data: "retried" });

    const result = await instance._onRejected(error);

    expect(axios.post).toHaveBeenCalled(); // 재발급 시도 확인
    expect(instance.request).toHaveBeenCalled(); // 원래 요청 재시도 확인
    expect(result).toMatchObject({ data: "retried" });
  });

  it("accessToken 재발급이 실패하면 토큰 구독을 제거하고 리다이렉트를 수행한다.", async () => {
    const error = createExpiredTokenError();

    // 재발급 실패 mock
    (axios.post as jest.Mock).mockRejectedValueOnce({
      isAxiosError: jest.fn(() => true),
      response: { status: 401 },
      toJSON: () => ({})
    });

    const result = instance._onRejected(error).catch((e: unknown) => e);
    await expect(result).resolves.toBeDefined();

    expect(tokenObservable.removeAll).toHaveBeenCalled(); // 구독 해제
    expect(redirect).toHaveBeenCalled(); // 리다이렉트 수행
  });

  it("accessToken 재발급 중 중복 요청이 들어오면, 추가 요청은 대기하고 재발급은 한 번만 수행된다.", async () => {
    const error1 = createExpiredTokenError();
    const error2 = createExpiredTokenError();

    let isRefreshing = false;

    // 재발급 요청은 단 1번만 허용
    (axios.post as jest.Mock).mockImplementation(() => {
      if (!isRefreshing) {
        isRefreshing = true;
        return Promise.resolve({
          headers: { "set-cookie": ["accessToken=abc"] }
        });
      }
    });

    const observerCallbacks: (() => void)[] = [];

    let resolveSecond: (value: unknown) => void;
    const promise2 = new Promise((resolve) => {
      resolveSecond = resolve;
    });

    // 두 번째 요청은 구독 처리
    const cbSpy = jest.fn(async () => {
      const res = await customAxios.request(error2.config);
      resolveSecond(res); // 대기 중인 Promise 해제
    });

    // 구독자 등록 mock
    (tokenObservable.setObserver as jest.Mock).mockImplementation(() => {
      observerCallbacks.push(cbSpy);
    });

    instance.request.mockResolvedValue({ data: "retried" });

    const promise1 = instance._onRejected(error1); // 첫 요청
    instance._onRejected(error2); // 두 번째 요청은 대기

    await promise1; // 첫 번째 요청 완료
    await Promise.all(observerCallbacks.map((cb) => cb())); // 구독된 요청 실행
    await expect(promise2).resolves.toMatchObject({ data: "retried" });

    expect(observerCallbacks.length).toBe(1);
    expect(cbSpy).toHaveBeenCalled();
    expect(customAxios.request).toHaveBeenCalledWith(
      expect.objectContaining({ url: "/api/test" })
    );

    expect(axios.post).toHaveBeenCalledTimes(1); // 재발급 요청은 단 1회
    expect(instance.request).toHaveBeenCalledTimes(2); // 재시도 포함 총 2회 요청
  });

  it("SSR 환경에서는 accessToken 만료 시 즉시 에러를 throw 한다.", async () => {
    process.env.TEST_ENV = "SSR"; // SSR 조건 설정

    const error = createExpiredTokenError();
    const result = instance._onRejected(error);

    await expect(result).rejects.toThrow("Expired AccessToken.");
  });
});
