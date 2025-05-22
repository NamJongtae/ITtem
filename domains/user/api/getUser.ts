import customAxios from "@/utils/customAxios";
import { AuthData } from "../../auth/types/auth-types";

export default async function getUser(): Promise<AuthData> {
  try {
    const response = await customAxios.get("/api/auth/user");
    return response.data.user;
  } catch (error) {
    throw error;
  }
}
