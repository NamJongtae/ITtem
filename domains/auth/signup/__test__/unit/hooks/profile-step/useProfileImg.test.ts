import { renderHook, act } from "@testing-library/react";
import useProfileImg from "@/domains/auth/signup/hooks/profile-step/useProfileImg";
import { useFormContext } from "react-hook-form";
import { imgValidation } from "@/shared/common/utils/imgValidation";

jest.mock("react-hook-form");
jest.mock("@/shared/common/utils/imgValidation");

describe("useProfileImg 훅 테스트", () => {
  const mockSetValue = jest.fn();
  const mockGetValues = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useFormContext as jest.Mock).mockReturnValue({
      setValue: mockSetValue,
      getValues: mockGetValues
    });
  });

  it("handleClickImgInput이 호출되면 input 클릭이 실행된다", () => {
    const clickMock = jest.fn();
    const input = document.createElement("input");
    input.click = clickMock;

    const { result } = renderHook(() => useProfileImg());
    result.current.imgInputRef.current = input;

    act(() => {
      result.current.handleClickImgInput();
    });

    expect(clickMock).toHaveBeenCalled();
  });

  it("handleChangeImg가 유효한 파일이면 preview와 setValue가 호출됩니다.", () => {
    const file = new File(["dummy"], "test.png", { type: "image/png" });
    const mockURL = "blob:http://localhost/test-img";
    global.URL.createObjectURL = jest.fn(() => mockURL);
    (imgValidation as jest.Mock).mockReturnValue(true);

    const { result } = renderHook(() => useProfileImg());

    const event = {
      target: {
        files: [file]
      }
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handleChangeImg(event);
    });

    expect(mockSetValue).toHaveBeenCalledWith("profileImg", file, {
      shouldDirty: true,
      shouldValidate: true
    });
    expect(result.current.preview).toBe(mockURL);
  });

  it("handleChangeImg가 유효하지 않은 파일이면 아무 동작도 하지 않습니다.", () => {
    const file = new File(["bad"], "bad.exe", {
      type: "application/x-msdownload"
    });
    (imgValidation as jest.Mock).mockReturnValue(false);

    const { result } = renderHook(() => useProfileImg());

    const event = {
      target: {
        files: [file]
      }
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handleChangeImg(event);
    });

    expect(mockSetValue).not.toHaveBeenCalled();
    expect(result.current.preview).toBe("/icons/user-icon.svg"); // 초기값 유지
  });

  it("resetProfileImg는 preview를 기본 이미지로 설정하고 profileImg를 초기화합니다.", () => {
    const { result } = renderHook(() => useProfileImg());

    act(() => {
      result.current.resetProfileImg();
    });

    expect(mockSetValue).toHaveBeenCalledWith("profileImg", "", {
      shouldDirty: true,
      shouldValidate: true
    });
    expect(result.current.preview).toBe("/icons/user-icon.svg");
  });
});
