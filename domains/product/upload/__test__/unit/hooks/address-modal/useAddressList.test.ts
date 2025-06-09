import { renderHook, act } from "@testing-library/react";
import useAddressList from "@/domains/product/upload/hooks/address-modal/useAddressList";

describe("useAddressList 훅 테스트", () => {
  it("초기 addressList는 빈 배열입니다.", () => {
    const { result } = renderHook(() => useAddressList());

    expect(result.current.addressList).toEqual([]);
  });

  it("setAddressList 호출 시 addressList가 업데이트됩니다.", () => {
    const { result } = renderHook(() => useAddressList());

    act(() => {
      result.current.setAddressList(["서울시 강남구", "부산시 해운대구"]);
    });

    expect(result.current.addressList).toEqual([
      "서울시 강남구",
      "부산시 해운대구"
    ]);
  });
});
