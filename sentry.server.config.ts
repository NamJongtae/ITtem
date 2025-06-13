import * as Sentry from "@sentry/nextjs";

function isExcludedClientError(error: any): boolean {
  const status = error?.response?.status ?? error?.status;
  return typeof status === "number" && status >= 400 && status < 500;
}

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1,
  debug: false,
  beforeSend(event, hint) {
    // 400번대 에러는 전송하지 않음
    if (isExcludedClientError(hint?.originalException)) {
      return null;
    }

    // server tag를 넣어 에러를 구분
    event.tags = {
      ...event.tags,
      server: true
    };

    return event;
  }
});
