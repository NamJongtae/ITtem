import { renderHook, act } from "@testing-library/react";
import { useImgInputTrigger } from "@/domains/auth/signup/hooks/profile-step/useImgInputTrigger";

describe("useImgInputTrigger 훅 테스트", () => {
  it("handleClickImgInput이 호출되면 ref의 input 요소가 클릭됩니다.", () => {
    const input = document.createElement("input");
    const mockClick = jest.fn();
    input.click = mockClick;

    const { result } = renderHook(() => useImgInputTrigger());

    // ref에 가짜 input 요소 할당
    result.current.imgInputRef.current = input;

    act(() => {
      result.current.handleClickImgInput();
    });

    expect(mockClick).toHaveBeenCalled();
  });

  it("ref가 없으면 클릭되지 않습니다.", () => {
    const { result } = renderHook(() => useImgInputTrigger());

    act(() => {
      result.current.handleClickImgInput(); // ref가 null이므로 아무 일도 안 일어나야 함
    });

    // 에러 없이 정상 동작하면 통과
    expect(true).toBe(true);
  });
});
