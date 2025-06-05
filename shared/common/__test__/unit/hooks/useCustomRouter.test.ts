import { renderHook, act } from "@testing-library/react";
import { useCustomRouter } from "@/shared/common/hooks/useCustomRouter";
import { useRouter } from "next/navigation";

const mockPush = jest.fn();
const mockReplace = jest.fn();
const mockRefresh = jest.fn();
const mockBack = jest.fn();

jest.mock("next/navigation");

describe("useCustomRouter 훅 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      replace: mockReplace,
      refresh: mockRefresh,
      back: mockBack
    });
  });

  it("navigate(type: 'push')는 router.push를 호출해야 합니다.", () => {
    const { result } = renderHook(() => useCustomRouter());

    act(() => {
      result.current.navigate({
        type: "push",
        url: "/about",
        options: { scroll: false }
      });
    });

    expect(mockPush).toHaveBeenCalledWith("/about", { scroll: false });
  });

  it("navigate(type: 'replace')는 router.replace를 호출해야 합니다.", () => {
    const { result } = renderHook(() => useCustomRouter());

    act(() => {
      result.current.navigate({
        type: "replace",
        url: "/contact",
        options: { scroll: true }
      });
    });

    expect(mockReplace).toHaveBeenCalledWith("/contact", { scroll: true });
  });

  it("navigate(type: 'refresh')는 router.refresh를 호출해야 합니다.", () => {
    const { result } = renderHook(() => useCustomRouter());

    act(() => {
      result.current.navigate({ type: "refresh" });
    });

    expect(mockRefresh).toHaveBeenCalled();
  });

  it("navigate(type: 'back')는 router.back을 호출해야 합니다.", () => {
    const { result } = renderHook(() => useCustomRouter());

    act(() => {
      result.current.navigate({ type: "back" });
    });

    expect(mockBack).toHaveBeenCalled();
  });

  it("정의되지 않은 action.type은 에러를 발생시켜야 합니다.", () => {
    const { result } = renderHook(() => useCustomRouter());

    expect(() => {
      act(() => {
        result.current.navigate({ type: "unknown" } as any);
      });
    }).toThrow("Unhandled action");
  });
});
