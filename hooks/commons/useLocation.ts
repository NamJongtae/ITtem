import { useCallback } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { locationSlice } from "@/store/locationSlice";

export default function useLocation(saveLocation?: (address: string) => void) {
  const dispatch = useDispatch<AppDispatch>();

  const fetchAddressFromCoords = async (
    latitude: number,
    longitude: number
  ) => {
    const apiUrl = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}&input_coord=WGS84`;
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
        },
      });
      if (!response.ok) {
        throw new Error("주소 정보를 가져오는 데 실패했습니다.");
      }
      const data = await response.json();
      if (data.documents && data.documents.length > 0) {
        const addressInfo = data.documents[0].address;
        return addressInfo.address_name; // 주소 정보 반환
      }
    } catch (error) {
      console.error(error);
      toast.error("주소 정보를 가져오는 중 오류가 발생했습니다.");
      return null;
    }
  };

  const fetchCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const address = await fetchAddressFromCoords(latitude, longitude);
          if (address) {
            dispatch(locationSlice.actions.saveLocation(address.split(" ")[0]));
            if (!!saveLocation) {
              saveLocation(address);
            }
          } else {
            toast.warn("주소를 찾을 수 없어요.");
          }
        },
        (error) => {
          console.error(error);
          toast.warn("위치 정보를 가져오는데 실패했어요.");
        }
      );
    } else {
      toast.warn("현재 브라우저에서 위치 정보를 지원하지않아요.");
    }
  }, [dispatch]);

  return {
    fetchCurrentLocation,
  };
}
