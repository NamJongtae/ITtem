import { renderHook, act } from "@testing-library/react";
import useCheckNicknameDuplication from "@/domains/auth/signup/hooks/profile-step/useCheckNicknameDuplication";
import useNicknameDuplicationMutate from "@/domains/auth/shared/common/hooks/mutations/useNicknameDuplicationMutate";
import { useFormContext } from "react-hook-form";

jest.mock("react-hook-form");
jest.mock(
  "@/domains/auth/shared/common/hooks/mutations/useNicknameDuplicationMutate"
);

describe("useCheckNicknameDuplication 훅 테스트", () => {
  const mockUseFormContext = useFormContext as jest.Mock;
  const mockUserNicknameDuplicationMutate =
    useNicknameDuplicationMutate as jest.Mock;
  const mockSetError = jest.fn();
  const mockGetValues = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseFormContext.mockReturnValue({
      setError: mockSetError,
      getValues: mockGetValues
    });

    mockUserNicknameDuplicationMutate.mockReturnValue({
      nicknameDuplicationMutate: jest.fn()
    });
  });

  it("닉네임 중복이 없으면 nextStepHandler가 호출됩니다.", async () => {
    const mockMutate = jest.fn().mockResolvedValue(undefined);
    mockUserNicknameDuplicationMutate.mockReturnValue({
      nicknameDuplicationMutate: mockMutate
    });

    const nextStepHandler = jest.fn();
    mockGetValues.mockReturnValue("test123");

    const { result } = renderHook(() =>
      useCheckNicknameDuplication({ nextStepHandler })
    );

    await act(async () => {
      await result.current.checkNicknameDuplication();
    });

    expect(mockMutate).toHaveBeenCalledWith("test123");
    expect(nextStepHandler).toHaveBeenCalled();
  });

  it("닉네임이 중복되면 setError가 호출되고 nextStepHandler는 호출되지 않습니다.", async () => {
    const error = {
      response: {
        status: 401,
        data: { message: "중복된 닉네임입니다." }
      },
      isAxiosError: true
    };

    const mockMutate = jest.fn().mockRejectedValue(error);
    mockUserNicknameDuplicationMutate.mockReturnValue({
      nicknameDuplicationMutate: mockMutate
    });

    const nextStepHandler = jest.fn();
    mockGetValues.mockReturnValue("중복 닉네임");

    const { result } = renderHook(() =>
      useCheckNicknameDuplication({ nextStepHandler })
    );

    await act(async () => {
      await result.current.checkNicknameDuplication();
    });

    expect(mockMutate).toHaveBeenCalledWith("중복 닉네임");
    expect(mockSetError).toHaveBeenCalledWith("nickname", {
      type: "duplication",
      message: "이미 사용중인 닉네임입니다."
    });
    expect(nextStepHandler).not.toHaveBeenCalled();
  });
});
