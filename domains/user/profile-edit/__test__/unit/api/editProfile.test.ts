import editProfile from "../../../api/editProfile";
import customAxios from "@/shared/common/utils/customAxios";
import { AxiosHeaders, AxiosResponse } from "axios";
import { ProfileResponseData } from "@/domains/user/profile/types/responseTypes";
import { ProfileEditData } from "../../../types/profileEditTypes";
import { ProfileData } from "@/domains/user/profile/types/profileTypes";

jest.mock("@/shared/common/utils/customAxios");

describe("editProfile API 함수 테스트", () => {
  const mockEditData: ProfileEditData = {
    nickname: "newNickname",
    introduce: "newIntroduce",
    profileImg: "https://cdn.example.com/profile-new.jpg",
    profileImgFilename: "profile-new.jpg"
  };

  const mockResponse: AxiosResponse<ProfileResponseData> = {
    data: {
      profile: {
        uid: "user-123",
        email: "user@example.com",
        nickname: "newNickname",
        introduce: "newIntroduce",
        profileImg: "https://cdn.example.com/profile-new.jpg",
        profileImgFilename: "profile-new.jpg"
      } as ProfileData,
      message: "프로필 수정에 성공했어요."
    },
    status: 200,
    statusText: "OK",
    headers: {},
    config: {
      headers: new AxiosHeaders()
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("PATCH 요청을 보내고 수정된 프로필 데이터를 받습니다.", async () => {
    (customAxios.patch as jest.Mock).mockResolvedValue(mockResponse);

    const result = await editProfile(mockEditData);

    expect(customAxios.patch).toHaveBeenCalledWith("/api/profile", {
      profileEditData: mockEditData
    });

    expect(result).toEqual(mockResponse);
  });

  it("요청 실패 시 예외를 던집니다.", async () => {
    const error = new Error(
      "프로필 수정 실패했어요.\n잠시 후 다시 시도해주세요."
    );
    (customAxios.patch as jest.Mock).mockRejectedValue(error);

    await expect(editProfile(mockEditData)).rejects.toThrow(
      "프로필 수정 실패했어요.\n잠시 후 다시 시도해주세요."
    );
  });
});
