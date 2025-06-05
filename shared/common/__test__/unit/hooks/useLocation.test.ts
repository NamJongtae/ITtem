import { renderHook, act } from "@testing-library/react";
import useLocation from "@/shared/common/hooks/useLocation";
import useLocationStore from "@/shared/common/store/locationStore";
import { toast } from "react-toastify";

jest.mock("@/shared/common/store/locationStore", () => ({
  __esModule: true,
  default: jest.fn()
}));

global.fetch = jest.fn();

const mockSetLocation = jest.fn();
const mockToastError = jest.fn();
const mockToastWarn = jest.fn();

toast.error = mockToastError;
toast.warn = mockToastWarn;

describe("useLocation 훅 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useLocationStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ actions: { setLocation: mockSetLocation } })
    );
  });

  it("정상적으로 위치를 가져와서 주소를 저장합니다.", async () => {
    const mockAddress = "서울특별시 강남구 역삼동";

    // fetch mock: 카카오 API 응답 시뮬레이션
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        documents: [
          {
            address: { address_name: mockAddress }
          }
        ]
      })
    });

    // navigator.geolocation mock
    const mockGetCurrentPosition = jest.fn((success: any) => {
      success({
        coords: { latitude: 37.5, longitude: 127.0 }
      });
    });

    (global.navigator as any).geolocation = {
      getCurrentPosition: mockGetCurrentPosition
    };

    const saveLocation = jest.fn();
    const { result } = renderHook(() => useLocation(saveLocation));

    await act(async () => {
      result.current.fetchCurrentLocation();
    });

    expect(mockSetLocation).toHaveBeenCalledWith("서울특별시");
    expect(saveLocation).toHaveBeenCalledWith(mockAddress);
  });

  it("주소를 못 가져올 때 경고 토스트를 출력합니다.", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ documents: [] })
    });

    const mockGetCurrentPosition = jest.fn((success: any) => {
      success({
        coords: { latitude: 37.5, longitude: 127.0 }
      });
    });

    (global.navigator as any).geolocation = {
      getCurrentPosition: mockGetCurrentPosition
    };

    const { result } = renderHook(() => useLocation());

    await act(async () => {
      result.current.fetchCurrentLocation();
    });

    expect(mockToastWarn).toHaveBeenCalledWith("주소를 찾을 수 없어요.");
  });

  it("브라우저에서 위치 정보 미지원 시 경고 출력합니다.", async () => {
    (global.navigator as any).geolocation = undefined;

    const { result } = renderHook(() => useLocation());

    act(() => {
      result.current.fetchCurrentLocation();
    });

    expect(mockToastWarn).toHaveBeenCalledWith(
      "현재 브라우저에서 위치 정보를 지원하지않아요."
    );
  });

  it("위치 요청 실패 시 경고 출력", async () => {
    const mockGetCurrentPosition = jest.fn((_success: any, error: any) => {
      error({ code: 1, message: "User denied geolocation" });
    });

    (global.navigator as any).geolocation = {
      getCurrentPosition: mockGetCurrentPosition
    };

    const { result } = renderHook(() => useLocation());

    act(() => {
      result.current.fetchCurrentLocation();
    });

    expect(mockToastWarn).toHaveBeenCalledWith(
      "위치 정보를 가져오는데 실패했어요."
    );
  });

  it("API 응답 실패 시 에러 토스트 출력", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false
    });

    const mockGetCurrentPosition = jest.fn((success: any) => {
      success({
        coords: { latitude: 37.5, longitude: 127.0 }
      });
    });

    (global.navigator as any).geolocation = {
      getCurrentPosition: mockGetCurrentPosition
    };

    const { result } = renderHook(() => useLocation());

    await act(async () => {
      result.current.fetchCurrentLocation();
    });

    expect(mockToastError).toHaveBeenCalledWith(
      "주소 정보를 가져오는 중 오류가 발생했습니다."
    );
  });
});
