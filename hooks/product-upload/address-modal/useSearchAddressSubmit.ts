import { toast } from "react-toastify";
import { searchAddress } from "@/lib/api/product";
import { useRef } from 'react';

interface IParams {
  setAddressList: (addressList: string[]) => void;
}

export default function useSearchAddressSubmit({
  setAddressList
}: IParams) {
  const addressRef = useRef<HTMLInputElement>(null);
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const address = addressRef.current?.value || "";
    if (!address.trim()) {
      toast.warn("주소를 입력해주세요.");
      return;
    }

    try {
      const result = await searchAddress(address);
      setAddressList(result || []);
    } catch {
      toast.warn("주소 검색 실패했어요.");
    }
  };

  return { addressRef, onSubmit };
}
