import { renderHook, act } from "@testing-library/react";
import useProfileEditSubmit from "../../../hooks/useProfileEditSubmit";
import useProfileEditMutate from "../../../hooks/mutations/useProfileEditMutate";
import { useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

jest.mock("../../../hooks/mutations/useProfileEditMutate");
jest.mock("@tanstack/react-query", () => {
  const original = jest.requireActual("@tanstack/react-query");
  return {
    ...original,
    useQueryClient: jest.fn()
  };
});
jest.mock("axios", () => ({
  ...jest.requireActual("axios"),
  isAxiosError: jest.fn()
}));
jest.mock("react-toastify", () => ({
  toast: {
    warn: jest.fn()
  }
}));

describe("useProfileEditSubmit 훅 테스트", () => {
  const mockMutate = jest.fn();
  const mockGetQueryData = jest.fn();
  const mockQueryClient = { getQueryData: mockGetQueryData };
  const mockCloseModal = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useProfileEditMutate as jest.Mock).mockReturnValue({
      profileEditMutate: mockMutate,
      profileEditLoading: false
    });

    (useQueryClient as jest.Mock).mockReturnValue(mockQueryClient);
  });

  it("onSubmit 호출 시 profileEditMutate가 호출됩니다.", async () => {
    const mockProfileData = { uid: "user1", name: "홍길동" };
    mockGetQueryData.mockReturnValue(mockProfileData);

    const { result } = renderHook(() => useProfileEditSubmit(mockCloseModal));

    const formValues = { nickname: "새닉네임" };

    await act(async () => {
      await result.current.onSubmit(formValues);
    });

    expect(mockMutate).toHaveBeenCalledWith({
      values: formValues,
      profileData: mockProfileData,
      profileEditData: {}
    });
  });

  it("onSubmit 호출 시 AxiosError 발생 및 status가 401인 경우 해당 에러 메세지를 toast.warn를 통해 호출합니다.", async () => {
    const error = {
      response: {
        data: { message: "중복된 닉네임입니다." },
        status: 401
      },
      isAxiosError: true
    };

    (isAxiosError as unknown as jest.Mock).mockReturnValue(true);
    mockMutate.mockRejectedValue(error);
    mockGetQueryData.mockReturnValue({});

    const { result } = renderHook(() => useProfileEditSubmit(mockCloseModal));

    await act(async () => {
      await result.current.onSubmit({});
    });

    expect(toast.warn).toHaveBeenCalledWith("중복된 닉네임입니다.");
  });

  it("일반 에러 발생 시 고정된 에러 메세지를 toast.warn을 통해 호출합니다.", async () => {
    const error = new Error("알 수 없는 오류");

    mockMutate.mockRejectedValue(error);
    mockGetQueryData.mockReturnValue({});

    const { result } = renderHook(() => useProfileEditSubmit(mockCloseModal));

    await act(async () => {
      await result.current.onSubmit({});
    });

    expect(toast.warn).toHaveBeenCalledWith(
      "프로필 수정에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
  });
});
