import { renderHook, act } from "@testing-library/react";
import { useRouter } from "next/navigation";
import useSigninLinkHandler from "../../../hooks/useSigninLinkHandler";

jest.mock("next/navigation");
jest.useFakeTimers();
const mockUseRouter = useRouter as jest.Mock;

describe("useSigninLinkHandler 훅 테스트", () => {
  const mockPush = jest.fn();
  const mockBack = jest.fn();
  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      push: mockPush,
      back: mockBack
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("handleLinkClick 함수 호출 시 preventDefault, router.back 호출 후 setTimeout 내부 콜백에서 router.push가 호출되어야 합니다.", () => {
    const { result } = renderHook(() => useSigninLinkHandler());

    const { handleLinkClick } = result.current;

    // 가상의 이벤트 객체와 location 값을 설정합니다.
    const mockEvent = {
      preventDefault: jest.fn()
    } as unknown as React.MouseEvent<HTMLAnchorElement, MouseEvent>;

    const testLocation = "/test-location";

    act(() => {
      handleLinkClick(mockEvent, testLocation);
    });

    expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1);

    expect(mockBack).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(mockPush).toHaveBeenCalledWith(testLocation);
  });
});
