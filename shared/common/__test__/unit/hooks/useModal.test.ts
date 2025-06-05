import { renderHook, act } from "@testing-library/react";
import useModal from "@/shared/common/hooks/useModal";
import * as modalBackBtnHook from "@/shared/common/hooks/useModalMobileBackBtn";

jest.mock("@/shared/common/hooks/useModalMobileBackBtn", () => ({
  useModalMobileBackBtn: jest.fn()
}));
jest.mock("react-device-detect", () => ({
  isMobile: false
}));

describe("useModal 훅 테스트", () => {
  let originalHistoryBack: () => void;

  beforeEach(() => {
    originalHistoryBack = window.history.back;
    window.history.back = jest.fn();
    document.body.style.overflow = "auto";
  });

  afterEach(() => {
    window.history.back = originalHistoryBack;
    jest.clearAllMocks();
  });

  it("모달을 열고 닫을 수 있어야합니다.", () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.openModal();
    });

    expect(result.current.isOpenModal).toBe(true);
    expect(document.body.style.overflow).toBe("hidden");

    act(() => {
      result.current.closeModal();
    });

    expect(result.current.isOpenModal).toBe(false);
    expect(document.body.style.overflow).toBe("auto");
  });

  it("handleClickCloseBtn은 isMobile 또는 isImageModal이면 history.back()을 호출합니다.", () => {
    const { result } = renderHook(() => useModal({ isImageModal: true }));

    act(() => {
      result.current.openModal();
    });

    act(() => {
      result.current.handleClickCloseBtn();
    });

    expect(window.history.back).toHaveBeenCalled();
    expect(result.current.isOpenModal).toBe(false);
  });

  it("handleClickCloseBtn은 조건이 없으면 history.back()을 호출하지 않습니다.", () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.openModal();
    });

    act(() => {
      result.current.handleClickCloseBtn();
    });

    expect(window.history.back).not.toHaveBeenCalled();
    expect(result.current.isOpenModal).toBe(false);
  });

  it("useModalMobileBackBtn이 호출됩니다.", () => {
    const spy = jest.spyOn(modalBackBtnHook, "useModalMobileBackBtn");

    renderHook(() => useModal({ isImageModal: true }));

    expect(spy).toHaveBeenCalledWith({
      closeModal: expect.any(Function),
      isOpenModal: false,
      isImageModal: true
    });
  });
});
