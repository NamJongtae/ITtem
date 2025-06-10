import { renderHook } from "@testing-library/react";
import useChangePwFormLogic from "../../../hooks/useChangePwFormLogic";
import useChangePasswordMutate from "@/domains/auth/change-password/hooks/useChangePasswordMutate";
import useRouterBackToCloseModal from "@/shared/common/hooks/useRouterBackToCloseModal";
import useBodyOverflow from "@/shared/common/hooks/useBodyOverflow";

jest.mock("@/domains/auth/change-password/hooks/useChangePasswordMutate");
jest.mock("@/shared/common/hooks/useRouterBackToCloseModal");
jest.mock("@/shared/common/hooks/useBodyOverflow");

describe("useChangePwFormLogic", () => {
  const mockCloseModalHandler = jest.fn();
  const mockChangePasswordMutate = jest.fn();
  const mockUseRouterBackToCloseModal = useRouterBackToCloseModal as jest.Mock;
  const mockUseChangePasswordMutate = useChangePasswordMutate as jest.Mock;
  const mockUseBodyOverflow = useBodyOverflow as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseRouterBackToCloseModal.mockReturnValue({
      closeModalHandler: mockCloseModalHandler
    });

    mockUseChangePasswordMutate.mockReturnValue({
      changePasswordMutate: mockChangePasswordMutate,
      changePasswordLoading: false
    });
  });

  it("ref들과 핸들러, mutate 관련 값들을 정상적으로 반환합니다.", () => {
    const { result } = renderHook(() =>
      useChangePwFormLogic({ isModal: false })
    );

    expect(result.current.currentPwRef).toBeDefined();
    expect(result.current.pwRef).toBeDefined();
    expect(result.current.pwCheckRef).toBeDefined();
    expect(result.current.closeBtnRef).toBeDefined();
    expect(result.current.submitBtnRef).toBeDefined();
    expect(result.current.closeModalHandler).toBe(mockCloseModalHandler);
    expect(result.current.changePasswordMutate).toBe(mockChangePasswordMutate);
    expect(result.current.changePasswordLoading).toBe(false);
  });

  it("isModal이 true일 때 useBodyOverflow가 호출됩니다.", () => {
    renderHook(() => useChangePwFormLogic({ isModal: true }));

    expect(mockUseBodyOverflow).toHaveBeenCalledWith({ isLocked: true });
  });

  it("useChangePasswordMutate가 closeModalHandler를 넘겨받습니다.", () => {
    renderHook(() => useChangePwFormLogic({ isModal: false }));

    expect(mockUseChangePasswordMutate).toHaveBeenCalledWith({
      closeModal: mockCloseModalHandler
    });
  });
});
