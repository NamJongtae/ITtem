import { renderHook } from "@testing-library/react";
import { useFocusing } from "@/shared/common/hooks/useFocusing";
import { createRef } from "react";

describe("useFocusing 훅 테스트", () => {
  it("targetRef에 연결된 요소에 focus를 호출해야 합니다.", () => {
    // 가짜 DOM 요소와 focus 함수 mock
    const focusMock = jest.fn();
    const element = {
      focus: focusMock
    };

    // createRef로 ref 생성 후 current에 mock DOM 요소 할당
    const ref = createRef<HTMLElement>();
    ref.current = element as unknown as HTMLElement;

    renderHook(() => useFocusing(ref));

    // focus가 호출되었는지 검증
    expect(focusMock).toHaveBeenCalled();
  });

  it("targetRef.current가 null이면 focus 호출하지 않아야 합니다.", () => {
    const ref = createRef<HTMLElement>();
    ref.current = null;

    const focusMock = jest.fn();

    renderHook(() => useFocusing(ref));

    expect(focusMock).not.toHaveBeenCalled();
  });
});
