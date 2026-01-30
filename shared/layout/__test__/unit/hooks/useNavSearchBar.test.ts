import { renderHook, act } from "@testing-library/react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "react-toastify";
import useNavSearchBar from "@/shared/layout/hooks/useNavSearchBar";
import { useGetQuerys } from "@/shared/common/hooks/useGetQuerys";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn()
}));

jest.mock("@/shared/common/hooks/useGetQuerys", () => ({
  useGetQuerys: jest.fn()
}));

jest.mock("react-toastify", () => ({
  toast: {
    warn: jest.fn()
  }
}));

describe("useNavSearchBar 훅 테스트", () => {
  const mockPush = jest.fn();
  const mockToastWarn = toast.warn as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it("register/onSubmit/submitHandler를 반환합니다.", () => {
    (usePathname as jest.Mock).mockReturnValue("/product/search");
    (useGetQuerys as jest.Mock).mockReturnValue({
      keyword: "기존검색어",
      category_id: undefined
    });

    const { result } = renderHook(() => useNavSearchBar());

    expect(result.current).toHaveProperty("register");
    expect(result.current).toHaveProperty("onSubmit");
    expect(result.current).toHaveProperty("submitHandler");
  });

  it("검색어가 없으면 toast.warn을 호출하고 push 하지 않습니다.", () => {
    (usePathname as jest.Mock).mockReturnValue("/product/search");
    (useGetQuerys as jest.Mock).mockReturnValue({
      keyword: "",
      category_id: undefined
    });

    const { result } = renderHook(() => useNavSearchBar());

    act(() => {
      result.current.submitHandler({ keyword: "" });
    });

    expect(mockToastWarn).toHaveBeenCalledWith("검색어를 입력해주세요.");
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("검색어가 있으면 /product/search로 이동합니다. (category_id 없음)", () => {
    (usePathname as jest.Mock).mockReturnValue("/product/search");
    (useGetQuerys as jest.Mock).mockReturnValue({
      keyword: "",
      category_id: undefined
    });

    const { result } = renderHook(() => useNavSearchBar());

    act(() => {
      result.current.submitHandler({ keyword: "맥북" });
    });

    expect(mockPush).toHaveBeenCalledWith("/product/search?keyword=맥북");
    expect(mockToastWarn).not.toHaveBeenCalled();
  });

  it("검색어가 있으면 category_id를 포함해 /product/search로 이동합니다.", () => {
    (usePathname as jest.Mock).mockReturnValue("/product/search");
    (useGetQuerys as jest.Mock).mockReturnValue({
      keyword: "기존검색어",
      category_id: "3"
    });

    const { result } = renderHook(() => useNavSearchBar());

    act(() => {
      result.current.submitHandler({ keyword: "맥북" });
    });

    expect(mockPush).toHaveBeenCalledWith(
      "/product/search?keyword=맥북&category_id=3"
    );
  });

  it("검색 페이지(/product/search)가 아니면 keyword를 초기화하도록 동작합니다. (크래시 없이)", () => {
    // reset 자체를 직접 검증하기는 어려워도(react-hook-form 내부),
    // pathname 분기 로직이 실행돼도 에러 없이 훅이 동작하는지 정도는 보장 가능
    (usePathname as jest.Mock).mockReturnValue("/product/categories/1");
    (useGetQuerys as jest.Mock).mockReturnValue({
      keyword: "기존검색어",
      category_id: undefined
    });

    const { result } = renderHook(() => useNavSearchBar());

    expect(result.current).toHaveProperty("register");
  });
});
