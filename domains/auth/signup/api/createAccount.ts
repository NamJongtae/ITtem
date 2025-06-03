import { AxiosResponse } from "axios";
import { SignupData } from "../types/signupTypes";
import { SignupResponseData } from "../types/responseTypes";
import { toast } from "react-toastify";
import customAxios from "@/shared/common/utils/customAxios";
import { uploadProfileImgToFireStore } from "@/domains/user/profile/utils/uploadProfileImgToFireStore";

export default async function createAccount({
  email,
  password,
  nickname,
  profileImgFile,
  introduce
}: SignupData): Promise<AxiosResponse<SignupResponseData>> {
  let imgData;
  try {
    imgData = await uploadProfileImgToFireStore(profileImgFile);
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
