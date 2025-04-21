import { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface KakaoAddressDocument {
  address: {
    address_name: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
    mountain_yn: string;
    main_address_no: string;
    sub_address_no: string;
  };
  address_name: string;
  address_type: string;
  road_address: {
    address_name: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
    road_name: string;
    underground_yn: string;
    main_building_no: string;
    sub_building_no: string;
    building_name: string;
    zone_no: string;
  };
  x: string;
  y: string;
}

export default function useAddressModal(addAddress: (address: string) => void) {
  const addressRef = useRef<HTMLInputElement>(null);
  const [addressData, setAddressData] = useState<string[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const address = addressRef.current?.value;
    if (!address) {
      toast.warn("주소를 입력해주세요.");
      return;
    }
    try {
      const response = await axios(
        `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(
          address
        )}`,
        {
          headers: {
            Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`
          }
        }
      );
      const data = response.data.documents as KakaoAddressDocument[];
      const address_name = data.map((data) => {
        return data.address_name;
      });
      setAddressData(address_name);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickAddress = (address: string) => {
    addAddress(address);
  };

  return { addressData, handleSearch, handleClickAddress, addressRef };
}
