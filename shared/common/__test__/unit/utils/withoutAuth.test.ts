/**
 * @jest-environment node
 */
import {
  checkWithoutAuthPathname,
  withoutAuth
} from "@/shared/common/utils/withoutAuth";
import { NextRequest } from "next/server";

describe("checkWithoutAuthPathname 함수 테스트", () => {
  it("로그아웃 상태에서 접근 가능한 경로이면 true를 반환해야 함", () => {
    expect(checkWithoutAuthPathname("/signup")).toBe(true);
    expect(checkWithoutAuthPathname("/signup/complete")).toBe(true);
    expect(checkWithoutAuthPathname("/signin")).toBe(true);
    expect(checkWithoutAuthPathname("/find-password")).toBe(true);
  });

  it("로그인 후에만 접근 가능한 경로이면 false를 반환해야 함", () => {
    expect(checkWithoutAuthPathname("/profile")).toBe(false);
    expect(checkWithoutAuthPathname("/chat")).toBe(false);
    expect(checkWithoutAuthPathname("/product")).toBe(false);
  });
});

describe("withoutAuth 함수 테스트", () => {
  it("로그인 상태에서 접근 시 / 루트로 리다이렉트 되어야 함", () => {
    const mockReq = {
      nextUrl: {
        clone: () => ({
          pathname: "",
          search: "",
          toString: () => "http://localhost/"
        })
      }
    } as unknown as NextRequest;

    const response = withoutAuth(mockReq);
    expect(response.status).toBe(307); // Redirect
    expect(response.headers.get("location")).toContain("/");
  });
});
