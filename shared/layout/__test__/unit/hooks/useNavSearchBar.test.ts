import { renderHook } from "@testing-library/react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import useNavSearchBar from "@/shared/layout/hooks/useNavSearchBar";

jest.mock("next/navigation");

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

  it("초기 keyword가 폼에 설정되는지 확인합니다.", () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => "기존검색어"
    });

    const { result } = renderHook(() => useNavSearchBar());

    expect(result.current).toHaveProperty("register");
    expect(result.current).toHaveProperty("onSubmit");
    expect(result.current).toHaveProperty("submitHandler");
  });

  it("검색어가 없으면 toast.warn을 호출합니다.", () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => ""
    });

    const { result } = renderHook(() => useNavSearchBar());
    const { submitHandler } = result.current;

    submitHandler({ keyword: "" });
    expect(mockToastWarn).toHaveBeenCalledWith("검색어를 입력해주세요.");
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("검색어가 있으면 해당 URL로 이동합니다.", () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => ""
    });

    const { result } = renderHook(() => useNavSearchBar());
    const { submitHandler } = result.current;

    submitHandler({ keyword: "맥북" });

    expect(mockPush).toHaveBeenCalledWith("/search/product?keyword=맥북");
    expect(mockToastWarn).not.toHaveBeenCalled();
  });
});
