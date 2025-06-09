import { renderHook, act } from "@testing-library/react";
import useProductUploadDescField from "../../../hooks/useProductUploadDescField";
import { useFormContext } from "react-hook-form";

jest.mock("react-hook-form");

describe("useProductUploadDescField 훅 테스트", () => {
  const mockUseFormContext = useFormContext as jest.Mock;
  const mockSetValue = jest.fn();

  beforeEach(() => {
    mockSetValue.mockClear();

    mockUseFormContext.mockImplementation(() => ({
      register: jest.fn(),
      setValue: mockSetValue,
      watch: (name: string) => {
        if (name === "description") return "테스트 설명";
        return undefined;
      }
    }));
  });

  it("초기 productDesc 값을 반환합니다.", () => {
    const { result } = renderHook(() => useProductUploadDescField());

    expect(result.current.productDesc).toBe("테스트 설명");
  });

  it("handleChangeProductDesc 호출 시 앞에 공백이 있으면 trim 해서 setValue 호출합니다.", () => {
    const { result } = renderHook(() => useProductUploadDescField());

    const event = {
      target: {
        value: " 테스트입니다"
      }
    } as React.ChangeEvent<HTMLTextAreaElement>;

    act(() => {
      result.current.handleChangeProductDesc(event);
    });

    expect(mockSetValue).toHaveBeenCalledWith("description", "테스트입니다");
  });

  it("handleChangeProductDesc 호출 시 앞에 공백이 없으면 그대로 setValue 호출합니다.", () => {
    const { result } = renderHook(() => useProductUploadDescField());

    const event = {
      target: {
        value: "정상입력입니다"
      }
    } as React.ChangeEvent<HTMLTextAreaElement>;

    act(() => {
      result.current.handleChangeProductDesc(event);
    });

    expect(mockSetValue).toHaveBeenCalledWith("description", "정상입력입니다");
  });
});
