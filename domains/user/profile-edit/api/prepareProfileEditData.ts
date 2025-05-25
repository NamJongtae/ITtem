import { FieldValues } from "react-hook-form";
import { ProfileData } from "../../profile/types/profileTypes";
import { ProfileEditData } from "../types/profileEditTypes";
import { uploadImgToFireStore } from "@/shared/common/utils/api/firebase";

export default async function prepareProfileEditData({
  values,
  profileData,
  profileEditData
}: {
  values: FieldValues;
  profileData: ProfileData | undefined;
  profileEditData: ProfileEditData;
}) {
  for (const key of Object.keys(values)) {
    if (key === "profileImg") {
      if (
        JSON.stringify(profileData?.profileImgFilename) !==
        JSON.stringify(values.profileImg.name)
      ) {
        if (values.profileImg === "") {
          profileEditData.profileImg = "/icons/user-icon.svg";
          profileEditData.profileImgFilename = "";
          return;
        }
        if (!(values.profileImg instanceof File)) return;
        const imgFiles = values.profileImg;
        const imgData = await uploadImgToFireStore(imgFiles);
        if (!imgData) return;
        profileEditData.profileImg = imgData.url;
        profileEditData.profileImgFilename = imgData.name;
      }
    } else if (key === "nickname" || key === "introduce") {
      if (profileData && profileData[key] !== values[key]) {
        profileEditData[key] = values[key];
      }
    }
  }
}
