import { renderHook } from "@testing-library/react";
import { useSearchForm } from "../../../hooks/useSearchForm";

describe("useSearchForm 훅 테스트", () => {
  it("form에 search input이 있을 때 값을 정상적으로 반환합니다.", () => {
    const { result } = renderHook(() => useSearchForm());

    // 가짜 form 생성
    const form = document.createElement("form");

    // input 생성 및 form에 추가
    const input = document.createElement("input");
    input.name = "search";
    input.value = "바닐라라떼";
    form.appendChild(input);

    // formRef에 DOM 수동 주입
    result.current.formRef.current = form;

    // 검색 값 추출
    const searchValue = result.current.getSearchValue();
    expect(searchValue).toBe("바닐라라떼");
  });

  it("formRef가 null일 경우 빈 문자열 반환합니다.", () => {
    const { result } = renderHook(() => useSearchForm());

    result.current.formRef.current = null;

    const searchValue = result.current.getSearchValue();
    expect(searchValue).toBe("");
  });

  it("search 필드가 없는 form일 경우 빈 문자열 반환합니다.", () => {
    const { result } = renderHook(() => useSearchForm());

    const form = document.createElement("form");
    const input = document.createElement("input");
    input.name = "other";
    input.value = "무시됨";
    form.appendChild(input);

    result.current.formRef.current = form;

    const searchValue = result.current.getSearchValue();
    expect(searchValue).toBe("");
  });
});
