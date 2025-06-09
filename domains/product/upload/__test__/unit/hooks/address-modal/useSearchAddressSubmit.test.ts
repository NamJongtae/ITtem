import { renderHook, act } from "@testing-library/react";
import useSearchAddressSubmit from "@/domains/product/upload/hooks/address-modal/useSearchAddressSubmit";
import searchAddress from "@/domains/product/upload/api/searchAddress";
import { toast } from "react-toastify";

jest.mock("@/domains/product/upload/api/searchAddress");
jest.mock("react-toastify", () => ({
  toast: {
    warn: jest.fn()
  }
}));

describe("useSearchAddressSubmit 훅 테스트", () => {
  const mockSetAddressList = jest.fn();
  const mockSearch = searchAddress as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const makeEvent = () =>
    ({
      preventDefault: jest.fn(),
      stopPropagation: jest.fn()
    }) as unknown as React.FormEvent;

  it("주소가 공백이면 toast.warn을 호출합니다.", async () => {
    const { result } = renderHook(() =>
      useSearchAddressSubmit({ setAddressList: mockSetAddressList })
    );

    if (result.current.addressRef.current) {
      result.current.addressRef.current.value = "   ";
    } else {
      // ref 수동 주입
      const input = document.createElement("input");
      input.value = "   ";
      result.current.addressRef.current = input;
    }

    await act(async () => {
      await result.current.onSubmit(makeEvent());
    });

    expect(toast.warn).toHaveBeenCalledWith("주소를 입력해주세요.");
    expect(mockSetAddressList).not.toHaveBeenCalled();
  });

  it("주소 검색 성공 시 setAddressList가 결과를 받습니다.", async () => {
    mockSearch.mockResolvedValue(["서울시 강남구", "부산시 해운대구"]);

    const { result } = renderHook(() =>
      useSearchAddressSubmit({ setAddressList: mockSetAddressList })
    );

    const input = document.createElement("input");
    input.value = "강남";
    result.current.addressRef.current = input;

    await act(async () => {
      await result.current.onSubmit(makeEvent());
    });

    expect(searchAddress).toHaveBeenCalledWith("강남");
    expect(mockSetAddressList).toHaveBeenCalledWith([
      "서울시 강남구",
      "부산시 해운대구"
    ]);
  });

  it("주소 검색 실패 시 toast.warn을 호출합니다.", async () => {
    mockSearch.mockRejectedValue(new Error("실패"));

    const { result } = renderHook(() =>
      useSearchAddressSubmit({ setAddressList: mockSetAddressList })
    );

    const input = document.createElement("input");
    input.value = "신촌";
    result.current.addressRef.current = input;

    await act(async () => {
      await result.current.onSubmit(makeEvent());
    });

    expect(toast.warn).toHaveBeenCalledWith("주소 검색 실패했어요.");
  });
});
