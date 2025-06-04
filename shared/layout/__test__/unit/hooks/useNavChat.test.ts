import { renderHook, act } from "@testing-library/react";
import useNavChat from "@/shared/layout/hooks/useNavChat";
import useChatStore from "@/domains/chat/shared/store/chatStore";
import useUserChatInfoSubscription from "@/shared/layout/hooks/useUserChatInfoSubscription";
import { useRouter, usePathname } from "next/navigation";

jest.mock("next/navigation");
jest.mock("@/shared/layout/hooks/useUserChatInfoSubscription", () => jest.fn());
jest.mock("@/domains/chat/shared/store/chatStore", () => ({
  __esModule: true,
  default: jest.fn()
}));

describe("useNavChat 훅 테스트", () => {
  const mockRouterPush = jest.fn();
  const mockPathname = "/some-path";
  const mockTotalMessageCount = 5;

  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush
    });

    (usePathname as jest.Mock).mockReturnValue(mockPathname);

    (useChatStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ totalMessageCount: mockTotalMessageCount })
    );

    (useUserChatInfoSubscription as jest.Mock).mockImplementation(() => {});
  });

  it("pathname과 totalMessageCount가 반환되어야 합니다.", () => {
    const { result } = renderHook(() => useNavChat());

    expect(result.current.pathname).toBe(mockPathname);
    expect(result.current.totalMessageCount).toBe(mockTotalMessageCount);
  });

  it("handleClickChat 호출 시 /chat으로 라우팅해야 합니다.", () => {
    const { result } = renderHook(() => useNavChat());

    act(() => {
      result.current.handleClickChat();
    });

    expect(mockRouterPush).toHaveBeenCalledWith("/chat");
  });

  it("useUserChatInfoSubscription이 호출되어야 합니다.", () => {
    renderHook(() => useNavChat());
    expect(useUserChatInfoSubscription).toHaveBeenCalled();
  });
});
