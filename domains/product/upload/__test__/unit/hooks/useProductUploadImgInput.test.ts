import { renderHook } from "@testing-library/react";
import useProductUploadImgInput from "../../../hooks/useProductUploadImgInput";
import { useFormContext } from "react-hook-form";

jest.mock("react-hook-form");

describe("useProductUploadImgInput 훅 테스트", () => {
  const mockUseFormContext = useFormContext as jest.Mock;

  const mockRegister = jest.fn();
  const mockOnChangeImg = jest.fn();

  const mockRegisterReturn = {
    name: "imgData",
    onChange: jest.fn(),
    ref: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();

    mockRegister.mockReturnValue(mockRegisterReturn);

    mockUseFormContext.mockReturnValue({
      register: mockRegister
    });
  });

  it("register가 imgData와 함께 onChange, validate 옵션으로 호출됩니다.", () => {
    renderHook(() =>
      useProductUploadImgInput({
        onChangeImg: mockOnChangeImg
      })
    );

    expect(mockRegister).toHaveBeenCalledWith("imgData", {
      onChange: mockOnChangeImg,
      validate: expect.any(Function)
    });

    const validateFn = mockRegister.mock.calls[0][1].validate;

    // validate 테스트
    expect(validateFn(["img1"])).toBeTruthy(); // 이미지 있음
    expect(validateFn(undefined)).toBe("이미지를 선택해주세요."); // 없음
  });

  it("register 결과값이 그대로 반환되는지 확인합니다.", () => {
    const { result } = renderHook(() =>
      useProductUploadImgInput({
        onChangeImg: mockOnChangeImg
      })
    );

    expect(result.current.rest).toEqual(mockRegisterReturn);
  });
});
