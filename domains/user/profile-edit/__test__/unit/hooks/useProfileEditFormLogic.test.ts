import { renderHook } from "@testing-library/react";
import useProfileEditFormLogic from "../../../hooks/useProfileEditFormLogic";
import useMyProfileQuery from "@/domains/user/profile/hooks/queries/useMyProfileQuery";
import useProfileEditSubmit from "../../../hooks/useProfileEditSubmit";
import useBodyOverflow from "@/shared/common/hooks/useBodyOverflow";
import useRouterBackToCloseModal from "@/shared/common/hooks/useRouterBackToCloseModal";

jest.mock("@/domains/user/profile/hooks/queries/useMyProfileQuery");
jest.mock("../../../hooks/useProfileEditSubmit");
jest.mock("@/shared/common/hooks/useBodyOverflow");
jest.mock("@/shared/common/hooks/useRouterBackToCloseModal");

describe("useProfileEditFormLogic 훅 테스트", () => {
  const mockMyProfileData = { uid: "me", nickname: "user123" };
  const mockCloseModalHandler = jest.fn();
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useMyProfileQuery as jest.Mock).mockReturnValue({
      myProfileData: mockMyProfileData,
      myProfilePending: false
    });

    (useProfileEditSubmit as jest.Mock).mockReturnValue({
      onSubmit: mockOnSubmit,
      profileEditLoading: false
    });

    (useRouterBackToCloseModal as jest.Mock).mockReturnValue({
      closeModalHandler: mockCloseModalHandler
    });
  });

  it("각 ref와 값들이 정상적으로 반환됩니다.", () => {
    const { result } = renderHook(() =>
      useProfileEditFormLogic({ isModal: true })
    );

    // ref 확인
    expect(result.current.nicknameRef).toBeDefined();
    expect(result.current.introduceRef).toBeDefined();
    expect(result.current.closeBtnRef).toBeDefined();
    expect(result.current.submitBtnRef).toBeDefined();
    expect(result.current.profileImgBtnRef).toBeDefined();
    expect(result.current.profileImgResetBtnRef).toBeDefined();

    // 데이터 확인
    expect(result.current.myProfileData).toEqual(mockMyProfileData);
    expect(result.current.myProfilePending).toBe(false);
    expect(result.current.onSubmit).toBe(mockOnSubmit);
    expect(result.current.profileEditLoading).toBe(false);
    expect(result.current.closeModalHandler).toBe(mockCloseModalHandler);
  });

  it("isModal이 true일 경우 useBodyOverflow가 호출됩니다.", () => {
    renderHook(() => useProfileEditFormLogic({ isModal: true }));

    expect(useBodyOverflow).toHaveBeenCalledWith({ isLocked: true });
  });

  it("isModal이 false일 경우 useBodyOverflow가 호출됩니다.", () => {
    renderHook(() => useProfileEditFormLogic({ isModal: false }));

    expect(useBodyOverflow).toHaveBeenCalledWith({ isLocked: false });
  });
});
