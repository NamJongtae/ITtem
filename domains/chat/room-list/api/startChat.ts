import { AxiosResponse } from "axios";
import { StartChatResponseData } from "../types/responseTypes";
import customAxios from "@/shared/common/utils/customAxios";

export default async function startChat({
  productId,
  userId
}: {
  productId: string;
  userId: string;
}): Promise<AxiosResponse<StartChatResponseData>> {
  try {
    const response = await customAxios.post(`/api/chat`, {
      productId,
      userId
    });
    return response;
  } catch (error) {
    throw error;
  }
}
