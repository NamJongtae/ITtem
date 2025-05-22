import customAxios from "@/utils/customAxios";
import { NicknameDuplicationResponseData } from "../types/response-types";
import { AxiosResponse } from "axios";

export default async function checkNicknameDuplication(
  nickname: string
): Promise<AxiosResponse<NicknameDuplicationResponseData>> {
  try {
    const response = await customAxios.post("/api/auth/duplication/nickname", {
      nickname
    });
    return response;
  } catch (error) {
    throw error;
  }
}
