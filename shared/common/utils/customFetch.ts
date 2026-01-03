import tokenObservable from "./Observable"; // Axios 예제에 있던 Observable 경로
import redirect from "./redirect"; // Axios 예제에 있던 redirect 경로

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

// 전역 변수로 플래그 관리
let isRefreshing = false;

export const createFetch = (baseURL: string, defaultOptions?: RequestInit) => {
  return async (url: string, withToken = true, options?: RequestInit) => {
    // URL 결합 로직
    const fullURL = new URL(url, baseURL).toString();

    // 옵션 병합
    const mergedOptions: RequestInit = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions?.headers,
        ...options?.headers
      }
    };

    return withToken
      ? fetchWithToken(fullURL, mergedOptions)
      : fetch(fullURL, mergedOptions);
  };
};

const fetchWithToken = async (
  url: string,
  options: RequestInit
): Promise<Response> => {
  // 1. 초기 요청 시도
  let response = await fetch(url, options);

  // 2. 401 에러 체크
  if (response.status === 401) {
    // SSR 환경 체크 (Axios 로직 반영)
    if (typeof window === "undefined" || process.env.TEST_ENV === "SSR") {
      // 서버 환경에서 401 발생 시 바로 에러 처리
      const errorData = await response
        .clone()
        .json()
        .catch(() => ({}));
      if (errorData?.message === "만료된 토큰이에요.") {
        throw new Error("Expired AccessToken.");
      }
    }

    // 에러 메시지 확인을 위해 clone 후 파싱 (Body는 한 번만 읽을 수 있으므로)
    const responseClone = response.clone();
    const errorData = await responseClone.json().catch(() => ({}));

    // 3. 특정 에러 메시지인 경우 토큰 갱신 로직 진입
    if (errorData?.message === "만료된 토큰이에요.") {
      // Case A: 이미 다른 요청에 의해 토큰 갱신이 진행 중인 경우
      if (isRefreshing) {
        // 현재 요청을 대기열(Observable)에 등록하고 Promise 반환
        return new Promise((resolve) => {
          tokenObservable.setObserver(() => {
            // 알림을 받으면 원래 요청 재시도
            resolve(fetchWithToken(url, options));
          });
        });
      }

      // Case B: 토큰 갱신을 처음 시도하는 경우
      isRefreshing = true;

      try {
        const refreshResponse = await fetch(
          `${BASE_URL}/api/auth/refresh-token`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            credentials: "include"
          }
        );

        if (!refreshResponse.ok) {
          throw refreshResponse; // catch 블록으로 이동
        }

        // 갱신 성공 -> 대기 중이던 요청들에게 알림
        tokenObservable.notifyAll();

        // 현재 요청 재시도
        return fetchWithToken(url, options);
      } catch (refreshError) {
        // 갱신 실패 -> 대기열 초기화 및 에러 처리
        tokenObservable.removeAll();

        if (typeof window !== "undefined") {
          redirect("/session-expired");
        }

        throw refreshError;
      } finally {
        // 상태 초기화
        isRefreshing = false;
      }
    }
  }

  return response;
};

export const customFetch = createFetch(BASE_URL, {
  headers: { "Content-Type": "application/json" },
  credentials: "include"
});
