import {
  FollowersResponseData,
  FollowingsResponseData,
  ProfileResponseData,
  ReviewsResponseData,
  WishResponseData
} from "@/types/api-types";
import { AxiosResponse } from "axios";
import customAxios from "../customAxios";
import { ProfileData, ProfileEditData } from "@/types/auth-types";
import { FieldValues } from "react-hook-form";
import { uploadImgToFireStore } from "./firebase";

export async function getUserProfile(
  uid: string
): Promise<AxiosResponse<ProfileResponseData>> {
  try {
    const response = await customAxios(`/api/profile/${uid}`);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getMyProfile(): Promise<
  AxiosResponse<ProfileResponseData>
> {
  try {
    const response = await customAxios("/api/profile");
    return response;
  } catch (error) {
    throw error;
  }
}

export async function follow(uid: string) {
  try {
    const response = await customAxios.post(`/api/profile/${uid}/follow`);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function unfollow(uid: string) {
  try {
    const response = await customAxios.delete(`/api/profile/${uid}/follow`);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function editProfile(
  profileEditData: ProfileEditData
): Promise<AxiosResponse<ProfileResponseData>> {
  try {
    const response = await customAxios.patch("/api/profile", {
      profileEditData
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getFollowers({
  cursor,
  limit = 10,
  userIds
}: {
  userIds: string[] | undefined;
  cursor?: unknown;
  limit?: number;
}): Promise<AxiosResponse<FollowersResponseData>> {
  try {
    const response = await customAxios.post(
      `/api/profile/followers?limit=${limit}${
        cursor ? `&cursor=${cursor}` : ""
      }`,
      {
        userIds
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getFollowings({
  cursor,
  limit = 10,
  userIds
}: {
  userIds: string[] | undefined;
  cursor?: unknown;
  limit?: number;
}): Promise<AxiosResponse<FollowingsResponseData>> {
  try {
    const response = await customAxios.post(
      `/api/profile/followings?limit=${limit}${
        cursor ? `&cursor=${cursor}` : ""
      }`,
      {
        userIds
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getProfileWish({
  wishProductIds,
  cursor,
  limit = 10
}: {
  wishProductIds: string[];
  cursor?: unknown;
  limit?: number;
}): Promise<AxiosResponse<WishResponseData>> {
  try {
    const response = await customAxios.post(
      `/api/profile/wish?limit=${limit}${cursor ? `&cursor=${cursor}` : ""}`,
      {
        wishProductIds
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function deleteProfileWish(
  wishProductIds: string[]
): Promise<AxiosResponse<WishResponseData>> {
  try {
    const response = await customAxios.delete("/api/profile/wish", {
      data: { wishProductIds }
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getProfileReviews({
  uid,
  cursor,
  limit = 10
}: {
  uid: string;
  cursor?: unknown;
  limit?: number;
}): Promise<AxiosResponse<ReviewsResponseData>> {
  try {
    const response = await customAxios(
      `/api/profile/${uid}/review?limit=${limit}${
        cursor ? `&cursor=${cursor}` : ""
      }`
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export const setProfileEditData = async ({
  values,
  profileData,
  profileEditData
}: {
  values: FieldValues;
  profileData: ProfileData | undefined;
  profileEditData: ProfileEditData;
}) => {
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
};
