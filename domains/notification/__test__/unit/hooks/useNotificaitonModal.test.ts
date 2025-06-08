import { renderHook } from "@testing-library/react";
import useNotificaitonModal from "@/domains/notification/hooks/useNotificaitonModal";
import { useFocusing } from "@/shared/common/hooks/useFocusing";
import { useModalMobileBackBtn } from "@/shared/common/hooks/useModalMobileBackBtn";

jest.mock("@/shared/common/hooks/useFocusing");
jest.mock("@/shared/common/hooks/useModalMobileBackBtn");

describe("useNotificaitonModal 훅 테스트", () => {
  const mockRef = { current: document.createElement("div") };
  const toggleMock = jest.fn();
  const mockUseFocusing = useFocusing as jest.Mock;
  const mockUseModalMobileBackBtn = useModalMobileBackBtn as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseFocusing.mockReturnValue(undefined);
    mockUseModalMobileBackBtn.mockReturnValue(undefined);
  });

  it("useFocusing과 useModalMobileBackBtn이 호출되는지 확인합니다.", () => {
    renderHook(() =>
      useNotificaitonModal({
        notificationModalRef: mockRef,
        isOpenModal: true,
        toggleNotification: toggleMock
      })
    );

    expect(mockUseFocusing).toHaveBeenCalledWith(mockRef);
    expect(mockUseModalMobileBackBtn).toHaveBeenCalledWith({
      isOpenModal: true,
      closeModal: toggleMock
    });
  });
});
