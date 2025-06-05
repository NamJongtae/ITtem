import { renderHook, act } from "@testing-library/react";
import useLocationChkBoxHandler from "@/shared/common/hooks/useLocationChkBoxHandler";
import useLocationStore from "@/shared/common/store/locationStore";

jest.mock("@/shared/common/store/locationStore", () => ({
  __esModule: true,
  default: jest.fn()
}));

describe("useLocationChkBoxHandler 훅 테스트", () => {
  const mockSetCheckLocation = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("체크박스 상태가 false일 때 클릭하면 true로 변경됩니다.", () => {
    // 현재 체크 상태가 false라고 가정
    (useLocationStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        checkedLoacation: false,
        actions: {
          setCheckLocation: mockSetCheckLocation
        }
      })
    );

    const { result } = renderHook(() => useLocationChkBoxHandler());

    act(() => {
      result.current.handleClickCheck();
    });

    // setCheckLocation(true)가 호출되었는지 확인
    expect(mockSetCheckLocation).toHaveBeenCalledWith(true);
  });

  it("체크박스 상태가 true일 때 클릭하면 false로 변경됩니다.", () => {
    // 현재 체크 상태가 true라고 가정
    (useLocationStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        checkedLoacation: true,
        actions: {
          setCheckLocation: mockSetCheckLocation
        }
      })
    );

    const { result } = renderHook(() => useLocationChkBoxHandler());

    act(() => {
      result.current.handleClickCheck();
    });

    // setCheckLocation(false)가 호출되었는지 확인
    expect(mockSetCheckLocation).toHaveBeenCalledWith(false);
  });
});
