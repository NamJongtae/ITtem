import { renderHook, act } from "@testing-library/react";
import useProductUploadPriceField from "../../../hooks/useProductUploadPriceField";
import { useFormContext } from "react-hook-form";

jest.mock("react-hook-form");

describe("useProductUploadPriceField 훅 테스트", () => {
  const mockUseFormContext = useFormContext as jest.Mock;

  const mockSetValue = jest.fn();
  const mockWatch = jest.fn();
  const mockGetValues = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockWatch.mockReturnValue("10,000");
    mockGetValues.mockReturnValue("5000");

    mockUseFormContext.mockReturnValue({
      watch: mockWatch,
      setValue: mockSetValue,
      getValues: mockGetValues
    });
  });

  it("watch를 통해 price 값을 반환해야 합니다.", () => {
    const { result } = renderHook(() => useProductUploadPriceField());
    expect(result.current.price).toBe("10,000");
  });

  it("onChangePrice 호출 시 숫자만 추출해 포맷팅하고 setValue를 호출합니다.", () => {
    const { result } = renderHook(() => useProductUploadPriceField());

    const event = {
      target: {
        value: "abc1234000xyz"
      }
    } as React.ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.onChangePrice(event);
    });

    expect(mockSetValue).toHaveBeenCalledWith("price", "1,234,000");
  });

  it("onChangePrice 호출 시 공백이나 문자가 입력될 경우 빈 문자열을 setValue로 호출합니다.", () => {
    const { result } = renderHook(() => useProductUploadPriceField());

    const event = {
      target: {
        value: "문자입력!"
      }
    } as React.ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.onChangePrice(event);
    });

    expect(mockSetValue).toHaveBeenCalledWith("price", "");
  });

  it("mount 시 getValues의 값을 숫자 콤마 형식으로 포맷해서 setValue를 호출합니다.", () => {
    renderHook(() => useProductUploadPriceField());

    expect(mockGetValues).toHaveBeenCalledWith("price");
    expect(mockSetValue).toHaveBeenCalledWith("price", "5,000");
  });

  it("mount 시 price가 falsy일 경우 setValue 호출하지 않습니다.", () => {
    mockGetValues.mockReturnValueOnce("");

    renderHook(() => useProductUploadPriceField());

    expect(mockSetValue).not.toHaveBeenCalledWith("price", expect.any(String));
  });
});
