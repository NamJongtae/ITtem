import { ProfileResponseData } from "../types/responseTypes";
import { customFetch } from "@/shared/common/utils/customFetch";

export default async function getMyProfile(): Promise<ProfileResponseData> {
  try {
    const response = await customFetch("/api/profile", true);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData?.messsage
          ? errorData?.messsage
          : "프로필 데이터 조회에 실패했어요."
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
