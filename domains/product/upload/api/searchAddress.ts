import customAxios from "@/shared/common/utils/customAxios";
import { KakaoAddressDocument } from "../../shared/types/productTypes";

export default async function searchAddress(address: string) {
  try {
    const response = await customAxios(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(
        address
      )}`,
      {
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`
        },
        withCredentials: false
      }
    );
    const data = response.data.documents as KakaoAddressDocument[];
    const address_name = data.map((data) => {
      return data.address_name;
    });
    return address_name;
  } catch (error) {
    throw error;
  }
}
