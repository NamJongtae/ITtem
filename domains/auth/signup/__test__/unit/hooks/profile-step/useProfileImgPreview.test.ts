import { renderHook, act } from "@testing-library/react";
import { useFormContext } from "react-hook-form";
import { imgValidation } from "@/shared/common/utils/imgValidation";
import { useProfileImgPreview } from "@/domains/auth/signup/hooks/profile-step/useProfileImgPreview";
import React from "react";

jest.mock("react-hook-form");
jest.mock("@/shared/common/utils/imgValidation");

describe("useProfileImgPreview 훅 테스트", () => {
  const mockSetValue = jest.fn();
  const mockUseFormContext = useFormContext as jest.Mock;
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseFormContext.mockReturnValue({
      setValue: mockSetValue
    });
  });

  it("유효한 이미지 업로드 시 preview와 setValue가 호출됩니다.", () => {
    const file = new File(["dummy"], "test.png", { type: "image/png" });
    const mockURL = "blob:http://localhost/test-img";
    global.URL.createObjectURL = jest.fn(() => mockURL);
    (imgValidation as jest.Mock).mockReturnValue(true);

    const { result } = renderHook(() => useProfileImgPreview());

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

  it("유효하지 않은 이미지 업로드 시 setValue와 preview가 호출되지 않습니다.", () => {
    const file = new File(["bad"], "bad.exe", {
      type: "application/x-msdownload"
    });
    (imgValidation as jest.Mock).mockReturnValue(false);

    const { result } = renderHook(() => useProfileImgPreview());

    const event = {
      target: {
        files: [file]
      }
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handleChangeImg(event);
    });

    expect(mockSetValue).not.toHaveBeenCalled();
    expect(result.current.preview).toBe("/icons/user-icon.svg");
  });

  it("resetProfileImg는 preview를 초기화하고 setValue를 빈 값으로 설정합니다.", () => {
    const { result } = renderHook(() => useProfileImgPreview());

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
