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

  const mockedAxios = {
    ...original,
    create: jest.fn(() => localInstance),
    isAxiosError: jest.fn(() => true)
  };

  return {
    __esModule: true,
    ...mockedAxios,
    default: mockedAxios,
    __getInstance: () => localInstance
  };
});

import redirect from "@/shared/common/utils/redirect";
import * as axiosModule from "axios";
import customAxios from "@/shared/common/utils/customAxios";

const instance = (axiosModule as any).__getInstance();

const create401Error = (message: string = "만료된 세션이에요."): AxiosError =>
  ({
    name: "AxiosError",
    message: "Request failed with status code 401",
    config: {
      method: "get",
      url: "/api/test",
      headers: {}
    } as unknown as InternalAxiosRequestConfig,
    response: {
      status: 401,
      statusText: "Unauthorized",
      headers: {},
      config: {} as any,
      data: { message }
    } as any,
    isAxiosError: true,
    toJSON: () => ({})
  }) as any;

beforeEach(() => {
  jest.clearAllMocks();

  // fetch mock
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    status: 200
  } as any);

  delete process.env.TEST_ENV;

  (global as any).window = (global as any).window ?? {};
});

describe("customAxios 테스트", () => {
  it("정상적인 200 응답이면 응답을 그대로 반환한다.", async () => {
    instance.request.mockResolvedValueOnce({ data: "ok" });

    const res = await customAxios.request({ method: "get", url: "/api/test" });
    expect(res.data).toBe("ok");
  });

  it("CSR 환경에서 session이 만료(401)되었을 경우 Session 삭제 API를 호출하고 /session-expired로 리다이렉트한다.", async () => {
    const error = create401Error("만료된 세션이에요.");


    (global as any).window = {};

    const resultPromise = Promise.resolve(instance._onRejected?.(error));
    await expect(resultPromise).rejects.toBeDefined();

    expect(global.fetch).toHaveBeenCalledWith("/api/auth/session-cookie", {
      method: "DELETE"
    });
    expect(redirect).toHaveBeenCalledWith("/session-expired");
  });

  it("401이지만 message가 다르면 fetch/redirect를 호출하지 않고 에러를 그대로 reject한다.", async () => {
    const error = create401Error("만료된 토큰이에요.");

    (global as any).window = {};

    const resultPromise = Promise.resolve(instance._onRejected?.(error));
    await expect(resultPromise).rejects.toBeDefined();

    expect(global.fetch).not.toHaveBeenCalled();
    expect(redirect).not.toHaveBeenCalled();
  });

  it("SSR 환경(window undefined)에서는 401이어도 fetch/redirect를 호출하지 않고 에러를 그대로 reject한다.", async () => {
    const error = create401Error("만료된 세션이에요.");

    delete (global as any).window;
    process.env.TEST_ENV = "SSR";

    const resultPromise = Promise.resolve(instance._onRejected?.(error));
    await expect(resultPromise).rejects.toBeDefined();

    expect(global.fetch).not.toHaveBeenCalled();
    expect(redirect).not.toHaveBeenCalled();
  });
});
