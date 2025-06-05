import { renderHook } from "@testing-library/react";
import { useModalMobileBackBtn } from "@/shared/common/hooks/useModalMobileBackBtn";

// 모바일 환경 모킹
jest.mock("react-device-detect", () => ({
  isMobile: true
}));

describe("useModalMobileBackBtn 훅 테스트", () => {
  const originalLocation = window.location;

  beforeEach(() => {
    jest.spyOn(window.history, "pushState").mockImplementation(() => {});
    jest.spyOn(window.history, "back").mockImplementation(() => {});
  });

  afterEach(() => {
    window.location = originalLocation;
    jest.restoreAllMocks();
  });

  it("모달이 열리면 pushState가 호출되어야 한다", () => {
    const closeModal = jest.fn();

    renderHook(() =>
      useModalMobileBackBtn({
        closeModal,
        isOpenModal: true,
        isImageModal: false
      })
    );

    expect(window.history.pushState).toHaveBeenCalledWith(
      { modal: true },
      "",
      "http://localhost/"
    );
  });

  it("뒤로 가기(popstate) 발생 시 closeModal이 호출되어야 한다", () => {
    const closeModal = jest.fn();

    renderHook(() =>
      useModalMobileBackBtn({
        closeModal,
        isOpenModal: true,
        isImageModal: false
      })
    );

    // popstate 이벤트 발생
    window.onpopstate?.(new PopStateEvent("popstate"));

    expect(closeModal).toHaveBeenCalled();
  });

  it("초기 마운트 시 history.state.modal이 존재하면 history.back이 호출되어야 한다", () => {
    const closeModal = jest.fn();

    // state에 modal:true가 있다고 가정
    const originalState = window.history.state;
    Object.defineProperty(window.history, "state", {
      value: { modal: true },
      writable: true
    });

    renderHook(() =>
      useModalMobileBackBtn({
        closeModal,
        isOpenModal: false,
        isImageModal: false
      })
    );

    expect(window.history.back).toHaveBeenCalled();

    // 원래 state로 복구
    Object.defineProperty(window.history, "state", {
      value: originalState,
      writable: true
    });
  });
});
