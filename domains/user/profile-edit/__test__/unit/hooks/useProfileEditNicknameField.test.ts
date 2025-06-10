import { renderHook, act } from "@testing-library/react";
import useProfileEditNicknameField from "../../../hooks/useProfileEditNicknameField";
import { useFormContext } from "react-hook-form";
import useNicknameDuplicationMutate from "@/domains/auth/shared/common/hooks/mutations/useNicknameDuplicationMutate";
import { isAxiosError } from "axios";

jest.mock("react-hook-form", () => ({
  useFormContext: jest.fn()
}));
jest.mock(
  "@/domains/auth/shared/common/hooks/mutations/useNicknameDuplicationMutate"
);
jest.mock("axios", () => ({
  ...jest.requireActual("axios"),
  isAxiosError: jest.fn()
}));

describe("useProfileEditNicknameField 훅 테스트", () => {
  const mockSetError = jest.fn();
  const mockMutate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useFormContext as jest.Mock).mockReturnValue({
      setError: mockSetError,
      formState: {
        defaultValues: {
          nickname: "기존닉네임"
        }
      }
    });

    (useNicknameDuplicationMutate as jest.Mock).mockReturnValue({
      nicknameDuplicationMutate: mockMutate
    });
  });

  it("닉네임이 기존과 같으면 API 호출하지 않습니다.", async () => {
    const { result } = renderHook(() => useProfileEditNicknameField());

    const event = {
      target: {
        value: "기존닉네임"
      }
    } as React.ChangeEvent<HTMLInputElement>;

    await act(async () => {
      await result.current.validateNicknameOnBlur(event);
    });

    expect(mockMutate).not.toHaveBeenCalled();
    expect(mockSetError).not.toHaveBeenCalled();
  });

  it("닉네임 중복 검사 성공 시 setError를 호출하지 않습니다.", async () => {
    mockMutate.mockResolvedValue(undefined);

    const { result } = renderHook(() => useProfileEditNicknameField());

    const event = {
      target: {
        value: "새로운닉네임"
      }
    } as React.ChangeEvent<HTMLInputElement>;

    await act(async () => {
      await result.current.validateNicknameOnBlur(event);
    });

    expect(mockMutate).toHaveBeenCalledWith("새로운닉네임");
    expect(mockSetError).not.toHaveBeenCalled();
  });

  it("중복 닉네임 에러(401) 발생 시 setError를 호출합니다.", async () => {
    const error = {
      response: {
        status: 401,
        data: {
          message: "중복된 닉네임이에요."
        }
      },
      isAxiosError: true
    };

    mockMutate.mockRejectedValue(error);
    (isAxiosError as unknown as jest.Mock).mockReturnValue(true);
    const { result } = renderHook(() => useProfileEditNicknameField());

    const event = {
      target: {
        value: "중복닉네임"
      }
    } as React.ChangeEvent<HTMLInputElement>;

    await act(async () => {
      await result.current.validateNicknameOnBlur(event);
    });

    expect(mockSetError).toHaveBeenCalledWith("nickname", {
      type: "validate",
      message: "중복된 닉네임이에요."
    });
  });

  it("AxiosError가 아니거나 상태코드가 401이 아니면 setError 호출하지 않습니다.", async () => {
    const error = {
      response: {
        status: 500
      }
    };

    mockMutate.mockRejectedValue(error);

    const { result } = renderHook(() => useProfileEditNicknameField());

    const event = {
      target: {
        value: "서버오류닉네임"
      }
    } as React.ChangeEvent<HTMLInputElement>;

    await act(async () => {
      await result.current.validateNicknameOnBlur(event);
    });

    expect(mockSetError).not.toHaveBeenCalled();
  });
});
