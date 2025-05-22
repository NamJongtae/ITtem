import customAxios from "@/utils/customAxios";
import { SessionCookiesResponseData } from "../types/response-types";
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
