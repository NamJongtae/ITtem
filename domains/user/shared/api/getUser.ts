import customAxios from "@/shared/common/utils/customAxios";
import { AuthData } from "@/domains/auth/shared/common/types/authTypes";

export default async function getUser(): Promise<AuthData> {
  try {
    const response = await customAxios.get("/api/auth/user");
    return response.data.user;
  } catch (error) {
    throw error;
  }
}
