import { renderHook } from "@testing-library/react";
import useProductUploadConditionField from "../../../hooks/useProductUploadConditionField";
import { useFormContext } from "react-hook-form";

jest.mock("react-hook-form");

describe("useProductUploadConditionField 훅 테스트", () => {
  const mockUseFormContext = useFormContext as jest.Mock;
  let mockCondition = "A";

  beforeEach(() => {
    mockCondition = "A"; // 초기값 설정

    mockUseFormContext.mockImplementation(() => ({
      register: jest.fn(),
      getValues: (name: string) => {
        if (name === "condition") return mockCondition;
        return undefined;
      }
    }));
  });

  it("초기 currentCondition 값을 반환해야 합니다.", () => {
    const { result } = renderHook(() => useProductUploadConditionField());

    expect(result.current.currentCondition).toBe("A");
  });

  it("getDescription 함수가 각 상태 코드에 대해 정확한 설명을 반환해야 합니다.", () => {
    const { result } = renderHook(() => useProductUploadConditionField());

    expect(result.current.getDescription("S")).toBe("사용하지 않은 새 상품");
    expect(result.current.getDescription("A")).toBe(
      "사용 하였지만 깨끗한 외관"
    );
    expect(result.current.getDescription("B")).toBe(
      "눈에 띄는 기스나 흔적이 조금 있음"
    );
    expect(result.current.getDescription("C")).toBe(
      "눈에 띄는 기스나 흔적이 많이 있음"
    );
    expect(result.current.getDescription("D")).toBe("고장/파손");
    expect(result.current.getDescription("Z")).toBe("알 수 없음"); // 예외 처리 확인
  });
});
