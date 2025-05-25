import customAxios from "@/shared/common/utils/customAxios";
import { SessionCookiesResponseData } from "../types/responseTypes";
import { AxiosResponse } from "axios";

export default async function getSessionCookies(): Promise<
  AxiosResponse<SessionCookiesResponseData>
> {
  try {
    const response = await customAxios.get("/api/auth/session");
    return response;
  } catch (error) {
    throw error;
  }
}
