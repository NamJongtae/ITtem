import customAxios from "@/utils/customAxios";
import { AxiosResponse } from "axios";

export async function changePassword({
  password,
  currentPassword
}: {
  password: string;
  currentPassword: string;
}): Promise<AxiosResponse<{ message: string }>> {
  try {
    const response = await customAxios.patch("/api/auth/change-password", {
      password,
      currentPassword
    });
    return response;
  } catch (error) {
    throw error;
  }
}
