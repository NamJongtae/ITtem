import { AxiosResponse } from "axios";
import { SignupData } from "../../types/auth-types";
import { SignupResponseData } from "../../types/response-types";
import { uploadImgToFireStore } from "@/utils/api/firebase";
import { toast } from "react-toastify";
import customAxios from "@/utils/customAxios";

export default async function createAccount({
  email,
  password,
  nickname,
  profileImgFile,
  introduce
}: SignupData): Promise<AxiosResponse<SignupResponseData>> {
  let imgData;
  try {
    imgData = await uploadImgToFireStore(profileImgFile);
  } catch (error) {
    if (error instanceof Error) {
      toast.warn(error.message);
    }
  }
  try {
    const response = await customAxios.post("/api/auth/signup", {
      email,
      password,
      nickname,
      profileImgData: imgData || { url: "/icons/user-icon.svg", name: "" },
      introduce
    });
    return response;
  } catch (error) {
    throw error;
  }
}
