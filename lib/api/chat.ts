import { AxiosResponse } from "axios";
import customAxios from "../customAxios";
import { StartChatResponseData } from "@/types/apiTypes";

export async function startChat({
  productId,
  userId,
}: {
  productId: string;
  userId: string;
}): Promise<AxiosResponse<StartChatResponseData>> {
  try {
    const response = await customAxios.post(`/api/chat`, {
      productId,
      userId,
    });
    return response;
  } catch (error) {
    throw error;
  }
}
