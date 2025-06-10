import { renderHook } from "@testing-library/react";
import useIntroduceField from "../../../hooks/useIntroduceField";
import { useFormContext } from "react-hook-form";

jest.mock("react-hook-form");

describe("useIntroduceField", () => {
  const mockSetValue = jest.fn();
  const mockRegister = jest.fn();
  const mockUseFormContext = useFormContext as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseFormContext.mockReturnValue({
      register: mockRegister,
      setValue: mockSetValue
    });

    mockRegister.mockReturnValue({
      ref: jest.fn(),
      name: "introduce",
      onChange: jest.fn()
    });
  });

  it("register가 호출되고 ref와 rest를 반환합니다.", () => {
    const { result } = renderHook(() => useIntroduceField());

    expect(useFormContext).toHaveBeenCalled();
    expect(mockRegister).toHaveBeenCalledWith("introduce", {
      onChange: expect.any(Function)
    });

    expect(result.current.ref).toBeDefined();
    expect(result.current.rest).toBeDefined();
  });

  it("onChange 함수에서 e.target.value.trim()값이 공백이라면 setValue를 호출합니다.", () => {
    let calledOnChange: (
      e: React.ChangeEvent<HTMLTextAreaElement>
    ) => void = () => {};

    mockRegister.mockImplementation((_name: string, options: any) => {
      calledOnChange = options.onChange;
      return {
        ref: jest.fn(),
        name: "introduce"
      };
    });

    renderHook(() => useIntroduceField());

    const mockEvent = {
      target: {
        value: "   "
      }
    } as React.ChangeEvent<HTMLTextAreaElement>;

    calledOnChange(mockEvent);

    expect(mockSetValue).toHaveBeenCalledWith("introduce", "");
  });

  it("onChange 함수에서 e.target.value.trim()값이 아니라면 setValue는 호출되지 않습니다", () => {
    let calledOnChange: (
      e: React.ChangeEvent<HTMLTextAreaElement>
    ) => void = () => {};

    mockRegister.mockImplementation((_name: string, options: any) => {
      calledOnChange = options.onChange;
      return {
        ref: jest.fn(),
        name: "introduce"
      };
    });

    renderHook(() => useIntroduceField());

    const mockEvent = {
      target: {
        value: "내용 있음"
      }
    } as React.ChangeEvent<HTMLTextAreaElement>;

    calledOnChange(mockEvent);

    expect(mockSetValue).not.toHaveBeenCalled();
  });
});
