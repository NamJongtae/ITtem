import { renderHook, act } from "@testing-library/react";
import useChatRoomSlideMenuLogic from "../../../hooks/useChatRoomSlideMenuLogic";
import useMyProfileQuery from "@/domains/user/profile/hooks/queries/useMyProfileQuery";

jest.mock("@/domains/user/profile/hooks/queries/useMyProfileQuery");

describe("useChatRoomSlideMenuLogic 훅 테스트", () => {
  const mockMyProfile = {
    id: "user1",
    name: "테스트유저"
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useMyProfileQuery as jest.Mock).mockReturnValue({
      myProfileData: mockMyProfile
    });
    jest.useFakeTimers({ legacyFakeTimers: true });
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("초기값이 올바르게 설정되어야 합니다.", () => {
    const { result } = renderHook(() => useChatRoomSlideMenuLogic());

    expect(result.current.isOpenMenu).toBe(false);
    expect(result.current.myProfileData).toEqual(mockMyProfile);
    expect(result.current.menuRef.current).toBeNull();
    expect(result.current.timerRef.current).toBeNull();
  });

  it("openMenu 호출 시 isOpenMenu는 true가 됩니다.", () => {
    const { result } = renderHook(() => useChatRoomSlideMenuLogic());

    act(() => {
      result.current.openMenu();
    });

    expect(result.current.isOpenMenu).toBe(true);
  });

  it("closeMenu 호출 시 isOpenMenu는 false가 됩니다.", () => {
    const { result } = renderHook(() => useChatRoomSlideMenuLogic());

    act(() => {
      result.current.openMenu(); // 먼저 열고
    });

    act(() => {
      result.current.closeMenu(); // 닫음
    });

    expect(result.current.isOpenMenu).toBe(false);
  });

  it("toggleMenu: 메뉴가 열려있으면 애니메이션 클래스를 조작하고 setTimeout으로 닫습니다.", () => {
    const { result } = renderHook(() => useChatRoomSlideMenuLogic());

    const mockDiv = {
      classList: {
        add: jest.fn(),
        remove: jest.fn()
      }
    } as unknown as HTMLDivElement;

    act(() => {
      result.current.menuRef.current = mockDiv;
      result.current.openMenu(); // true 상태로 만들기
    });

    act(() => {
      result.current.toggleMenu(); // 닫기로 전환
    });

    expect(mockDiv.classList.remove).toHaveBeenCalledWith(
      "animate-slideOutLeft"
    );
    expect(mockDiv.classList.add).toHaveBeenCalledWith("animate-slideOutRight");

    // 타이머 확인
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 480);

    // 타이머 실행
    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(result.current.isOpenMenu).toBe(false);
  });

  it("toggleMenu: 메뉴가 닫혀있으면 openMenu가 호출되어 열립니다.", () => {
    const { result } = renderHook(() => useChatRoomSlideMenuLogic());

    act(() => {
      result.current.toggleMenu();
    });

    expect(result.current.isOpenMenu).toBe(true);
  });
});
