import { renderHook, act } from "@testing-library/react";
import useProfileMenu from "../../../hooks/useProfileMenu";
import { useParams, useRouter, useSearchParams } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
  useParams: jest.fn()
}));

describe("useProfileMenu 훅 테스트", () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("쿼리스트링이 없으면 기본값은 'products'입니다.", () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => null
    });
    (useParams as jest.Mock).mockReturnValue({});

    const { result } = renderHook(() => useProfileMenu());

    expect(result.current.currentMenu).toBe("products");
  });

  it("쿼리스트링 m 값이 있으면 해당 값이 currentMenu가 됩니다.", () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => "reviews"
    });
    (useParams as jest.Mock).mockReturnValue({});

    const { result } = renderHook(() => useProfileMenu());

    expect(result.current.currentMenu).toBe("reviews");
  });

  it("uid가 없을 때 onClickMenu는 /profile 경로로 이동합니다.", () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => "products"
    });
    (useParams as jest.Mock).mockReturnValue({}); // uid 없음

    const { result } = renderHook(() => useProfileMenu());

    act(() => {
      result.current.onClickMenu("wishlist");
    });

    expect(pushMock).toHaveBeenCalledWith("/profile?m=wishlist");
  });

  it("uid가 있을 때 onClickMenu는 /profile/[uid] 경로로 이동합니다.", () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => "products"
    });
    (useParams as jest.Mock).mockReturnValue({ uid: "user123" });

    const { result } = renderHook(() => useProfileMenu());

    act(() => {
      result.current.onClickMenu("followers");
    });

    expect(pushMock).toHaveBeenCalledWith("/profile/user123?m=followers");
  });

  it("uid가 있을 때도 menu 값은 그대로 쿼리에 반영됩니다.", () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => "products"
    });
    (useParams as jest.Mock).mockReturnValue({ uid: "abc999" });

    const { result } = renderHook(() => useProfileMenu());

    act(() => {
      result.current.onClickMenu("reviews");
    });

    expect(pushMock).toHaveBeenCalledTimes(1);
    expect(pushMock).toHaveBeenLastCalledWith("/profile/abc999?m=reviews");
  });
});
