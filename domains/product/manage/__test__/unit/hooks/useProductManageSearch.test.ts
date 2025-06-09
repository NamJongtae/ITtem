import { renderHook, act } from "@testing-library/react";
import useProductManageSearch from "@/domains/product/manage/hooks/useProductManageSearch";
import { useCustomRouter } from "@/shared/common/hooks/useCustomRouter";
import { useGetQuerys } from "@/shared/common/hooks/useGetQuerys";

jest.mock("@/shared/common/hooks/useCustomRouter");
jest.mock("@/shared/common/hooks/useGetQuerys");

describe("useProductManageSearch 훅 테스트", () => {
  const mockNavigate = jest.fn();
  const mockUseCustomRouter = useCustomRouter as jest.Mock;
  const mockUseGetQuerys = useGetQuerys as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseCustomRouter.mockReturnValue({ navigate: mockNavigate });
  });

  const setupFormWithSearchValue = (value: string) => {
    const form = document.createElement("form");
    const input = document.createElement("input");
    input.name = "search";
    input.value = value;
    form.appendChild(input);
    return form;
  };

  it("form에 search 값이 있을 때 search 값을 포함된 URL로 이동해야 합니다.", () => {
    mockUseGetQuerys.mockReturnValue({ search: "노트북", status: "" });

    const { result } = renderHook(() => useProductManageSearch());
    const form = setupFormWithSearchValue("노트북");
    result.current.formRef.current = form;

    act(() => {
      result.current.onSubmitSearch({ preventDefault: jest.fn() } as any);
    });

    expect(mockNavigate).toHaveBeenCalledWith({
      type: "push",
      url: `/product/manage?search=${encodeURIComponent("노트북")}`
    });
  });

  it("search 값이 빈 문자열이면 search 쿼리는 빠지고 status값만 포함된 URL로 이동해야 합니다.", () => {
    mockUseGetQuerys.mockReturnValue({ search: "", status: "TARDING" });

    const { result } = renderHook(() => useProductManageSearch());
    const form = setupFormWithSearchValue("");
    result.current.formRef.current = form;

    act(() => {
      result.current.onSubmitSearch({ preventDefault: jest.fn() } as any);
    });

    expect(mockNavigate).toHaveBeenCalledWith({
      type: "push",
      url: "/product/manage?status=TARDING"
    });
  });

  it("search, status 둘 다 없으면 기본 URL로 이동합니다.", () => {
    mockUseGetQuerys.mockReturnValue({ search: "", status: "" });

    const { result } = renderHook(() => useProductManageSearch());
    const form = setupFormWithSearchValue(""); // 빈 입력
    result.current.formRef.current = form;

    act(() => {
      result.current.onSubmitSearch({ preventDefault: jest.fn() } as any);
    });

    expect(mockNavigate).toHaveBeenCalledWith({
      type: "push",
      url: "/product/manage"
    });
  });
});
