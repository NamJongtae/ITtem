import React, { JSX } from "react";
import { render, screen } from "@testing-library/react";
import { ErrorBoundary } from "@/shared/common/components/ErrorBoundary";

// toast와 Sentry를 mock 처리
jest.mock("react-toastify", () => ({ toast: { warn: jest.fn() } }));
jest.mock("@sentry/nextjs", () => ({ captureException: jest.fn() }));

import { toast } from "react-toastify";
import * as Sentry from "@sentry/nextjs";

// 에러를 발생시키는 테스트용 컴포넌트
function FaultyComponent(): JSX.Element {
  throw new Error("Test error");
}

describe("ErrorBoundary 컴포넌트 테스트", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("에러가 없을 때 children이 렌더링된다", () => {
    render(
      <ErrorBoundary fallback={<div>에러 발생</div>}>
        <div>정상 동작</div>
      </ErrorBoundary>
    );
    expect(screen.getByText("정상 동작")).toBeInTheDocument();
  });

  it("에러가 발생하면 fallback이 렌더링된다", () => {
    // render에서 에러가 발생해도 ErrorBoundary가 처리함
    render(
      <ErrorBoundary fallback={<div>에러 발생</div>}>
        <FaultyComponent />
      </ErrorBoundary>
    );
    expect(screen.getByText("에러 발생")).toBeInTheDocument();
  });

  it("에러 발생 시 errorMessage가 있으면 toast가 호출된다", () => {
    render(
      <ErrorBoundary fallback={<div>에러 발생</div>} errorMessage="에러 메시지">
        <FaultyComponent />
      </ErrorBoundary>
    );
    expect(toast.warn).toHaveBeenCalledWith("에러 메시지");
  });

  it("에러 발생 시 Sentry.captureException이 호출된다", () => {
    render(
      <ErrorBoundary fallback={<div>에러 발생</div>}>
        <FaultyComponent />
      </ErrorBoundary>
    );
    expect(Sentry.captureException).toHaveBeenCalled();
  });
});
