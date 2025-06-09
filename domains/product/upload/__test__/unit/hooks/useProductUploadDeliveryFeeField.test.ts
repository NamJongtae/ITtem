import { renderHook } from "@testing-library/react";
import useProductUploadDeliveryFeeField from "../../../hooks/useProductUploadDeliveryFeeField";
import { useFormContext } from "react-hook-form";

jest.mock("react-hook-form");

describe("useProductUploadDeliveryFeeField 훅 테스트", () => {
  const mockUseFormContext = useFormContext as jest.Mock;

  beforeEach(() => {
    mockUseFormContext.mockImplementation(() => ({
      register: jest.fn(),
      getValues: (name: string) => {
        if (name === "deliveryFee") return 3000;
        return undefined;
      }
    }));
  });

  it("초기 deliveryFee 값을 반환합니다.", () => {
    const { result } = renderHook(() => useProductUploadDeliveryFeeField());

    expect(result.current.deliveryFee).toBe(3000);
  });
});
