import { renderHook, act } from "@testing-library/react";
import useChangePasswordMutate from "../../../hooks/useChangePasswordMutate";
import * as changePasswordApi from "../../../api/changePassword";
import { toast } from "react-toastify";
import * as useGlobalLoadingStoreModule from "@/shared/common/store/globalLogingStore";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    warn: jest.fn()
  }
}));
jest.mock("@/shared/common/store/globalLogingStore");
jest.mock("../../../api/changePassword", () => ({
  changePassword: jest.fn()
}));

describe("useChangePasswordMutate 훅 테스트", () => {
  const mockCloseModal = jest.fn();
  const mockStartLoading = jest.fn();
  const mockStopLoading = jest.fn();
  const wrapper = createQueryClientWrapper();

  beforeEach(() => {
    (
      useGlobalLoadingStoreModule.default as unknown as jest.Mock
    ).mockImplementation(() => ({
      actions: {
        startLoading: mockStartLoading,
        stopLoading: mockStopLoading
      }
    }));
    jest.clearAllMocks();
  });

  it("비밀번호 변경 성공 시 toast.success 호출 및 closeModal 실행", async () => {
    const mockResponse = {
      data: { message: "비밀번호가 성공적으로 변경되었습니다." }
    };

    (changePasswordApi.changePassword as jest.Mock).mockResolvedValueOnce(
      mockResponse
    );

    const { result } = renderHook(
      () => useChangePasswordMutate({ closeModal: mockCloseModal }),
      { wrapper }
    );

    await act(async () => {
      await result.current.changePasswordMutate({
        currentPassword: "oldpw",
        password: "newpw"
      });
    });

    expect(mockStartLoading).toHaveBeenCalled();
    expect(mockStopLoading).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith(
      "비밀번호가 성공적으로 변경되었습니다."
    );
    expect(mockCloseModal).toHaveBeenCalled();
  });

  it("비밀번호 변경 실패 시 toast.warn 호출", async () => {
    const mockError = {
      isAxiosError: true,
      response: {
        data: { message: "현재 비밀번호가 올바르지 않습니다." }
      }
    };

    (changePasswordApi.changePassword as jest.Mock).mockRejectedValueOnce(
      mockError
    );

    const { result } = renderHook(() => useChangePasswordMutate(), {
      wrapper
    });

    await act(async () => {
      await result.current.changePasswordMutate({
        currentPassword: "wrongpw",
        password: "newpw"
      });
    });

    expect(toast.warn).toHaveBeenCalledWith(
      "현재 비밀번호가 올바르지 않습니다."
    );
    expect(mockStartLoading).toHaveBeenCalled();
    expect(mockStopLoading).toHaveBeenCalled();
  });
});
