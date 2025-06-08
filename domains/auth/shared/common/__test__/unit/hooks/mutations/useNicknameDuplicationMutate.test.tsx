import { renderHook, act } from "@testing-library/react";
import { toast } from "react-toastify";
import useNicknameDuplicationMutate from "../../../../hooks/mutations/useNicknameDuplicationMutate";
import checkNicknameDuplication from "../../../../api/checkNicknameDuplication";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";

jest.mock("../../../../api/checkNicknameDuplication");
jest.mock("react-toastify", () => ({
  toast: {
    warn: jest.fn()
  }
}));

jest.mock("axios", () => ({
  ...jest.requireActual("axios"),
  isAxiosError: () => true
}));

describe("useNicknameDuplicationMutate 훅 테스트", () => {
  const mockCheckNickname = checkNicknameDuplication as jest.Mock;
  const mockToastWarn = toast.warn as jest.Mock;

  const { Wrapper: wrapper } = createQueryClientWrapper();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("닉네임 중복 검사 API가 호출됩니다.", async () => {
    mockCheckNickname.mockResolvedValue({ data: { duplicated: false } });

    const { result } = renderHook(() => useNicknameDuplicationMutate(), {
      wrapper
    });

    await act(async () => {
      await result.current.nicknameDuplicationMutate("tester");
    });

    expect(mockCheckNickname).toHaveBeenCalledWith("tester");
  });

  it("401 오류가 발생하면 아무것도 호출되지 않습니다.", async () => {
    const error = {
      response: {
        status: 401,
        data: { message: "인증 오류" }
      }
    };

    mockCheckNickname.mockRejectedValue(error);

    const { result } = renderHook(() => useNicknameDuplicationMutate(), {
      wrapper
    });

    await act(async () => {
      await result.current.nicknameDuplicationMutate("tester").catch(() => {});
    });

    expect(mockToastWarn).not.toHaveBeenCalled();
  });

  it("401에러 이외 오류가 발생하면 toast.warn이 호출됩니다.", async () => {
    const error = {
      response: {
        status: 500,
        data: { message: "서버 오류" }
      }
    };

    mockCheckNickname.mockRejectedValue(error);

    const { result } = renderHook(() => useNicknameDuplicationMutate(), {
      wrapper
    });

    await act(async () => {
      await result.current.nicknameDuplicationMutate("tester").catch(() => {});
    });

    expect(mockToastWarn).toHaveBeenCalledWith(
      "알 수 없는 에러가 발생했어요.\n잠시 후 다시 시도해주세요."
    );
  });
});
