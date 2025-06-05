// __tests__/useRouterBackToCloseModal.test.ts
import { renderHook, act } from "@testing-library/react";
import { useRouter } from "next/navigation";
import useRouterBackToCloseModal from "@/shared/common/hooks/useRouterBackToCloseModal";

jest.mock("next/navigation");

describe("useRouterBackToCloseModal 훅 테스트", () => {
  it("closeModalHandler를 호출하면 router.back()이 호출되어야 합니다.", () => {
    const backMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ back: backMock });

    const { result } = renderHook(() => useRouterBackToCloseModal());

    // closeModalHandler를 실행
    act(() => {
      result.current.closeModalHandler();
    });

    // router.back()이 호출되었는지 확인
    expect(backMock).toHaveBeenCalled();
  });
});
