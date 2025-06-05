import { renderHook } from "@testing-library/react";
import useFetchLocation from "@/shared/common/hooks/useFetchLocation";
import useLocationStore from "@/shared/common/store/locationStore";

const fetchCurrentLocationMock = jest.fn();
const resetLocationMock = jest.fn();

jest.mock("@/shared/common/hooks/useLocation", () => ({
  __esModule: true,
  default: () => ({
    fetchCurrentLocation: fetchCurrentLocationMock
  })
}));

// 기본값은 checkedLoacation: false
jest.mock("@/shared/common/store/locationStore", () => ({
  __esModule: true,
  default: jest.fn((selector) =>
    selector({
      checkedLoacation: false,
      actions: {
        resetLocation: resetLocationMock
      }
    })
  )
}));

describe("useFetchLocation 훅 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("checkedLoacation이 true일 때 fetchCurrentLocation이 호출되어야 합니다.", () => {
    (useLocationStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        checkedLoacation: true,
        actions: {
          resetLocation: jest.fn()
        }
      })
    );

    renderHook(() => useFetchLocation());

    expect(fetchCurrentLocationMock).toHaveBeenCalled();
  });

  it("checkedLoacation이 false일 때 resetLocation이 호출되어야 합니다.", () => {
    (useLocationStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        checkedLoacation: false,
        actions: {
          resetLocation: resetLocationMock
        }
      })
    );
    renderHook(() => useFetchLocation());

    expect(resetLocationMock).toHaveBeenCalled();
  });
});
