import { renderHook, act } from "@testing-library/react";
import useProfileEditImg from "../../../hooks/useProfileEditImg";
import { useFormContext } from "react-hook-form";
import { imgValidation } from "@/shared/common/utils/imgValidation";

jest.mock("react-hook-form");

jest.mock("@/shared/common/utils/imgValidation");

describe("useProfileEditImg 훅 테스트", () => {
  const mockSetValue = jest.fn();
  const mockGetValues = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useFormContext as jest.Mock).mockReturnValue({
      setValue: mockSetValue,
      getValues: mockGetValues
    });

    // 기본 이미지 설정
    mockGetValues.mockReturnValue("/default/profile.png");

    // URL.createObjectURL mock
    global.URL.createObjectURL = jest.fn(() => "mock-preview-url");
  });

  it("마운트 시 preview가 getValues로 초기화됩니다.", () => {
    const { result } = renderHook(() => useProfileEditImg());

    expect(result.current.preview).toBe("/default/profile.png");
  });

  it("handleClickImgInput은 input element의 click을 호출합니다.", () => {
    const { result } = renderHook(() => useProfileEditImg());
    const fakeClick = jest.fn();

    result.current.imgInputRef.current = { click: fakeClick } as any;

    act(() => {
      result.current.handleClickImgInput();
    });

    expect(fakeClick).toHaveBeenCalled();
  });

  it("handleChangeImg는 유효한 파일이면 setValue와 preview 설정합니다.", () => {
    const file = new File(["(test)"], "profile.png", { type: "image/png" });

    (imgValidation as jest.Mock).mockReturnValue(true);

    const { result } = renderHook(() => useProfileEditImg());

    const event = {
      target: {
        files: [file]
      }
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handleChangeImg(event);
    });

    expect(imgValidation).toHaveBeenCalledWith(file);
    expect(mockSetValue).toHaveBeenCalledWith("profileImg", file, {
      shouldDirty: true,
      shouldValidate: true
    });
    expect(result.current.preview).toBe("mock-preview-url");
  });

  it("handleChangeImg는 유효하지 않은 파일이면 아무것도 호출되지 않습니다.", () => {
    (imgValidation as jest.Mock).mockReturnValue(false);

    const file = new File([""], "x.exe", { type: "application/x-msdownload" });

    const { result } = renderHook(() => useProfileEditImg());

    const event = {
      target: {
        files: [file]
      }
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handleChangeImg(event);
    });

    expect(imgValidation).toHaveBeenCalledWith(file);
    expect(mockSetValue).not.toHaveBeenCalled();
    expect(result.current.preview).toBe("/default/profile.png");
  });

  it("resetProfileImg는 프로필 값을 초기화하고 preview도 초기화합니다.", () => {
    const { result } = renderHook(() => useProfileEditImg());

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
