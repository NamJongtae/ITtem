import { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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
            Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
          },
        }
      );
      const data = response.data.documents.map(
        (data: any) => data.address_name
      );
      setAddressData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickAddress = (address: string) => {
    addAddress(address);
  };

  return { addressData, handleSearch, handleClickAddress, addressRef };
}
