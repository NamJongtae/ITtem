import * as Sentry from "@sentry/nextjs";

function isNetworkResponseError(error: unknown): boolean {
  const networkError = error as {
    isAxiosError?: boolean;
    response?: unknown;
    message?: string;
  };

  // Axios 에러
  if (networkError.isAxiosError && networkError.response) {
    return true;
  }

  const message =
    typeof error === "string" ? error : (networkError.message ?? "");

  // fetch 등의 네트워크 에러 메시지
  const networkErrorPatterns = [
    /Request failed with status code \d+/,
    /\b4\d\d\b/,
    /\b5\d\d\b/,
    /Failed to fetch/,
    /NetworkError/,
    /Load failed/,
    /Network request failed/
  ];

  return networkErrorPatterns.some((pattern) => pattern.test(message));
}

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    integrations: [Sentry.replayIntegration()],
    tracesSampleRate: 1,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    debug: false,

    beforeSend(event, hint) {
      // 서버 측에서 에러를 전송하므로
      // 네트워크 요청 결과로 받은 에러는 Sentry로 전송하지 않음
      if (isNetworkResponseError(hint.originalException)) {
        return null;
      }
    
      // client tag를 넣어 에러를 구분
      event.tags = {
        ...event.tags,
        client: true,
      };

        // 그 외의 클라이언트 에러만 전송
      return event;
    }
  });
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
