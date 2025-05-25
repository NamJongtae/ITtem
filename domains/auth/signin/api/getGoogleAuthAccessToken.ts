import customAxios from "@/shared/common/utils/customAxios";
import { AxiosResponse } from "axios";
import { GoogleAuthAccessTokenResponseData } from "../types/responseTypes";

export default async function getGoogleAuthAccessToken(
  code: string
): Promise<AxiosResponse<GoogleAuthAccessTokenResponseData>> {
  const params = new URLSearchParams({
    code: code,
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
    client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
    redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI as string,
    grant_type: "authorization_code"
  });

  try {
    const response = await customAxios.post(
      `https://oauth2.googleapis.com/token`,
      params.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}
