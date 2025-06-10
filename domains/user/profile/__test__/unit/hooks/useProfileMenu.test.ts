import { renderHook, act } from "@testing-library/react";
import useProfileMenu from "../../../hooks/useProfileMenu";
import { ProfileMenu } from "../../../types/profileTypes";

describe("useProfileMenu 훅 테스트", () => {
  it("초기값은 '판매상품'입니다.", () => {
    const { result } = renderHook(() => useProfileMenu());

    expect(result.current.profileMenu).toBe("판매상품");
  });

  it("onClickMenu를 호출하면 profileMenu가 변경됩니다.", () => {
    const { result } = renderHook(() => useProfileMenu());

    act(() => {
      result.current.onClickMenu("찜한상품" as ProfileMenu);
    });

    expect(result.current.profileMenu).toBe("찜한상품");
  });
});
