/**
 * @jest-environment node
 */
import { NextRequest } from "next/server";
import {
  checkWithAuthPathname,
  withAuth
} from "@/shared/common/utils/withAuth";

describe("checkWithAuthPathname 함수 테스트", () => {
  it("정확히 일치하는 경로에 대해 true를 반환해야 한다", () => {
    expect(checkWithAuthPathname("/profile")).toBe(true);
    expect(checkWithAuthPathname("/profile/edit")).toBe(true);
    expect(checkWithAuthPathname("/profile/change-password")).toBe(true);
  });

  it("특정 경로로 시작하는 경우 true를 반환해야 한다", () => {
    expect(checkWithAuthPathname("/chat/room1")).toBe(true);
    expect(checkWithAuthPathname("/product/manage/123")).toBe(true);
    expect(checkWithAuthPathname("/product/upload/image")).toBe(true);
  });

  it("인증이 필요하지 않은 경로는 false를 반환해야 한다", () => {
    expect(checkWithAuthPathname("/")).toBe(false);
    expect(checkWithAuthPathname("/about")).toBe(false);
    expect(checkWithAuthPathname("/product")).toBe(false);
  });
});

describe("withAuth 함수 테스트", () => {
  it("비로그인 시 /signin 경로로 리다이렉트 되어야 한다", () => {
    // NextRequest mock
    const mockReq = {
      nextUrl: {
        clone: () => ({
          pathname: "",
          search: "",
          toString: () => "http://localhost/signin"
        })
      }
    } as unknown as NextRequest;

    const response = withAuth(mockReq);
    expect(response.status).toBe(307); // Redirect
    expect(response.headers.get("location")).toContain("/signin");
  });
});
