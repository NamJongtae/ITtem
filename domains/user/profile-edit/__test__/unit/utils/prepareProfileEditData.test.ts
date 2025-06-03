import prepareProfileEditData from "../../../utils/prepareProfileEditData";
import { uploadProfileImgToFireStore } from "@/domains/user/profile/utils/uploadProfileImgToFireStore";
import { ProfileData } from "@/domains/user/profile/types/profileTypes";
import { ProfileEditData } from "../../../types/profileEditTypes";

jest.mock("@/domains/user/profile/utils/uploadProfileImgToFireStore");

describe("prepareProfileEditData 유틸 함수 테스트", () => {
  const newNickname = "newNickname";
  const prevNickname = "prevNickname";
  const newIntroduce = "newIntroduce";
  const prevIntroduce = "prevIntroduce";

  const mockProfileData = {
    uid: "user-123",
    email: "test@example.com",
    nickname: prevNickname,
    profileImg: "https://cdn.example.com/profile.jpg",
    profileImgFilename: "profile.jpg",
    introduce: prevIntroduce
  } as ProfileData;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("닉네임이 변경된 경우 profileEditData.nickname만 반영됩니다.", async () => {
    const values = {
      nickname: newNickname,
      introduce: prevIntroduce,
      profileImg: ""
    };
    const profileEditData = {} as ProfileEditData;

    await prepareProfileEditData({
      values,
      profileData: mockProfileData,
      profileEditData
    });

    expect(profileEditData.nickname).toBe(newNickname);
    expect(profileEditData.introduce).toBeUndefined();
  });

  it("소개가 변경된 경우 profileEditData.introduce만 반영됩니다.", async () => {
    const values = {
      nickname: prevNickname,
      introduce: newIntroduce,
      profileImg: ""
    };
    const profileEditData = {} as ProfileEditData;

    await prepareProfileEditData({
      values,
      profileData: mockProfileData,
      profileEditData
    });

    expect(profileEditData.nickname).toBeUndefined();
    expect(profileEditData.introduce).toBe(newIntroduce);
  });

  it("프로필 이미지가 없는 경우 기본 이미지 경로와 빈 파일명으로 설정되어야 한다", async () => {
    const values = {
      profileImg: "", // 없는 경우
      nickname: prevNickname,
      introduce: prevIntroduce
    };
    const profileEditData = {} as ProfileEditData;

    await prepareProfileEditData({
      values,
      profileData: mockProfileData,
      profileEditData
    });

    expect(profileEditData.profileImg).toBe("/icons/user-icon.svg");
    expect(profileEditData.profileImgFilename).toBe("");
  });

  it("프로필 이미지가 새 파일로 변경된 경우 업로드 함수를 호출해야 한다", async () => {
    const mockFile = new File(["dummy"], "new-profile.jpg", {
      type: "image/jpeg"
    });

    (uploadProfileImgToFireStore as jest.Mock).mockResolvedValue({
      url: "https://cdn.example.com/new-profile.jpg",
      name: "new-profile.jpg"
    });

    const values = {
      profileImg: mockFile,
      nickname: prevNickname,
      introduce: prevIntroduce
    };
    const profileEditData = {} as ProfileEditData;

    await prepareProfileEditData({
      values,
      profileData: mockProfileData,
      profileEditData
    });

    expect(uploadProfileImgToFireStore).toHaveBeenCalledWith(mockFile);
    expect(profileEditData.profileImg).toBe(
      "https://cdn.example.com/new-profile.jpg"
    );
    expect(profileEditData.profileImgFilename).toBe("new-profile.jpg");
  });

  it("이미지가 동일한 경우 아무런 업로드도 발생하지 않아야 한다", async () => {
    const values = {
      profileImg: { name: "profile.jpg" }, // 이름 같음
      nickname: prevNickname,
      introduce: prevIntroduce
    };
    const profileEditData = {} as ProfileEditData;

    await prepareProfileEditData({
      values,
      profileData: mockProfileData,
      profileEditData
    });

    expect(uploadProfileImgToFireStore).not.toHaveBeenCalled();
    expect(profileEditData).toEqual({});
  });
});
