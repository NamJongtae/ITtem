import { renderHook, act } from "@testing-library/react";
import useLocationSelector from "@/domains/product/upload/hooks/location-field/useLocationSelector";
import useLocation from "@/shared/common/hooks/useLocation";

jest.mock("@/shared/common/hooks/useLocation");

describe("useLocationSelector 훅 테스트", () => {
  const mockSetLocationValue = jest.fn();
  const mockCloseModal = jest.fn();
  const mockFetchCurrentLocation = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useLocation as jest.Mock).mockImplementation((onSuccess) => {
      return {
        fetchCurrentLocation: () => {
          onSuccess("서울");
          mockFetchCurrentLocation();
        }
      };
    });
  });

  it("selectNoPreferenceAddress 호출 시 '지역 무관'으로 주소가 설정됩니다.", () => {
    const { result } = renderHook(() =>
      useLocationSelector({
        setLocationValue: mockSetLocationValue,
        closeModal: mockCloseModal
      })
    );

    act(() => {
      result.current.selectNoPreferenceAddress();
    });

    expect(mockSetLocationValue).toHaveBeenCalledWith("지역 무관");
    expect(mockCloseModal).not.toHaveBeenCalled();
  });

  it("addAddress 호출 시 setLocationValue와 closeModal이 호출됨", () => {
    const { result } = renderHook(() =>
      useLocationSelector({
        setLocationValue: mockSetLocationValue,
        closeModal: mockCloseModal
      })
    );

    act(() => {
      result.current.addAddress("부산");
    });

    expect(mockSetLocationValue).toHaveBeenCalledWith("부산");
    expect(mockCloseModal).toHaveBeenCalled();
  });

  it("fetchCurrentLocation은 내부 useLocation에서 받아온 함수입니다.", () => {
    const { result } = renderHook(() =>
      useLocationSelector({
        setLocationValue: mockSetLocationValue,
        closeModal: mockCloseModal
      })
    );

    act(() => {
      result.current.fetchCurrentLocation();
    });

    expect(mockFetchCurrentLocation).toHaveBeenCalled();
    expect(mockSetLocationValue).toHaveBeenCalledWith("서울");
  });
});
