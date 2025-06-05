// __tests__/useVisible.test.ts
import { renderHook } from "@testing-library/react";
import useVisible from "@/shared/common/hooks/useVisible";
import { usePathname } from "next/navigation";

jest.mock("next/navigation");

describe("useVisible 훅 테스트", () => {
  it("pathnames에 포함된 문자열이 현재 경로에 없으면 isVisible은 true여야 합니다.", () => {
    // 현재 경로 설정
    (usePathname as jest.Mock).mockReturnValue("/home");

    const { result } = renderHook(() =>
      useVisible({ pathnames: ["/login", "/signup"] })
    );

    expect(result.current.isVisible).toBe(true);
  });

  it("pathnames 중 하나가 현재 경로에 포함되면 isVisible은 false여야 합니다.", () => {
    (usePathname as jest.Mock).mockReturnValue("/login/reset");

    const { result } = renderHook(() =>
      useVisible({ pathnames: ["/login", "/signup"] })
    );

    expect(result.current.isVisible).toBe(false);
  });

  it("pathnames 배열이 비어 있으면 항상 true를 반환해야 합니다.", () => {
    (usePathname as jest.Mock).mockReturnValue("/any-page");

    const { result } = renderHook(() => useVisible({ pathnames: [] }));

    expect(result.current.isVisible).toBe(true);
  });
});
