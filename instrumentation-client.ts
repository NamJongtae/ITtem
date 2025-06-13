import * as Sentry from "@sentry/nextjs";

function isExcludedClientError(error: any): boolean {
  const status = error?.response?.status ?? error?.status;
  return typeof status === "number" && status >= 400 && status < 500;
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
      // 400번대 에러는 전송하지 않음
      if (isExcludedClientError(hint.originalException)) {
        return null;
      }

      // client tag를 넣어 에러를 구분
      event.tags = {
        ...event.tags,
        client: true
      };

      return event;
    }
  });
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
