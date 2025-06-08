import { renderHook, act } from "@testing-library/react";
import useProductReportHandler from "../../../hooks/useProductReportHandler";
import { toast } from "react-toastify";
import useProductReportMutate from "../../../hooks/mutations/useProductReportMutate";
import useMyProfileQuery from "@/domains/user/profile/hooks/queries/useMyProfileQuery";

jest.mock("react-toastify", () => ({
  toast: {
    warn: jest.fn()
  }
}));
jest.mock("../../../hooks/mutations/useProductReportMutate");
jest.mock("@/domains/user/profile/hooks/queries/useMyProfileQuery");

describe("useProductReportHandler 훅 테스트", () => {
  const mockToastWarn = toast.warn as jest.Mock;
  const mockUseProductReportMutate = useProductReportMutate as jest.Mock;
  const mockUseMyProfileQuery = useMyProfileQuery as jest.Mock;
  const mockMutate = jest.fn();
  const mockConfirm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    global.confirm = mockConfirm;

    mockUseProductReportMutate.mockReturnValue({
      productReportMutate: mockMutate
    });
  });

  it("로그인하지 않은 경우 toast.warn이 호출됩니다.", () => {
    mockUseMyProfileQuery.mockReturnValue({
      myProfileData: null,
      myProfilePending: false
    });

    const { result } = renderHook(() =>
      useProductReportHandler({ reportUserIds: [] })
    );

    act(() => {
      result.current.handleClickReport();
    });

    expect(mockToastWarn).toHaveBeenCalledWith("로그인 후 이용해주세요.");
    expect(mockMutate).not.toHaveBeenCalled();
  });

  it("이미 신고한 경우 toast.warn이 호출됩니다.", () => {
    mockUseMyProfileQuery.mockReturnValue({
      myProfileData: { uid: "user123" },
      myProfilePending: false
    });

    const { result } = renderHook(() =>
      useProductReportHandler({ reportUserIds: ["user123"] })
    );

    act(() => {
      result.current.handleClickReport();
    });

    expect(mockToastWarn).toHaveBeenCalledWith("이미 신고한 상품이에요.");
    expect(mockMutate).not.toHaveBeenCalled();
  });

  it("신고 확인창에서 취소하면 mutate가 호출되지 않습니다.", () => {
    mockUseMyProfileQuery.mockReturnValue({
      myProfileData: { uid: "user123" },
      myProfilePending: false
    });

    mockConfirm.mockReturnValue(false);

    const { result } = renderHook(() =>
      useProductReportHandler({ reportUserIds: [] })
    );

    act(() => {
      result.current.handleClickReport();
    });

    expect(mockMutate).not.toHaveBeenCalled();
  });

  it("모든 조건 만족 & confirm true이면 mutate가 호출됩니다.", () => {
    mockUseMyProfileQuery.mockReturnValue({
      myProfileData: { uid: "user123" },
      myProfilePending: false
    });

    mockConfirm.mockReturnValue(true);

    const { result } = renderHook(() =>
      useProductReportHandler({ reportUserIds: [] })
    );

    act(() => {
      result.current.handleClickReport();
    });

    expect(mockMutate).toHaveBeenCalled();
  });
});
