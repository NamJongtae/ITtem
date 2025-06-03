import createAccount from "../../../api/createAccount";
import customAxios from "@/shared/common/utils/customAxios";
import { uploadProfileImgToFireStore } from "@/domains/user/profile/utils/uploadProfileImgToFireStore";
import { toast } from "react-toastify";
import { SignupResponseData } from "../../../types/responseTypes";
import { AxiosHeaders, AxiosResponse } from "axios";

// Mocks
jest.mock("@/shared/common/utils/customAxios");
jest.mock("@/domains/user/profile/utils/uploadProfileImgToFireStore");
jest.mock("react-toastify", () => ({
  toast: {
    warn: jest.fn()
  }
}));

describe("createAccount API 함수 테스트", () => {
  const mockSignupData = {
    email: "test@example.com",
    password: "Password123!",
    nickname: "tester",
    profileImgFile: new File(["test"], "profile.png", { type: "image/png" }),
    introduce: "hello world"
  };

  const mockProfileImgData = {
    url: "https://mock-storage.com/profile.png",
    name: "profile.png"
  };

  const mockResponse: AxiosResponse<SignupResponseData> = {
    data: {
      message: "회원가입에 성공했어요.",
      user: {
        uid: "user123",
        email: "test@example.com",
        nickname: "tester",
        profileImg: "https://mock-storage.com/profile.png"
      }
    },
    status: 201,
    statusText: "Created",
    headers: {},
    config: {
      headers: new AxiosHeaders()
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("프로필 이미지 업로드 후 회원가입 요청을 성공적으로 보냅니다.", async () => {
    (uploadProfileImgToFireStore as jest.Mock).mockResolvedValue(
      mockProfileImgData
    );
    (customAxios.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await createAccount(mockSignupData);

    expect(uploadProfileImgToFireStore).toHaveBeenCalledWith(
      mockSignupData.profileImgFile
    );
    expect(customAxios.post).toHaveBeenCalledWith("/api/auth/signup", {
      email: mockSignupData.email,
      password: mockSignupData.password,
      nickname: mockSignupData.nickname,
      profileImgData: mockProfileImgData,
      introduce: mockSignupData.introduce
    });
    expect(result).toEqual(mockResponse);
  });

  it("이미지 업로드 실패 시 기본 이미지로 회원가입 요청을 보내고 toast.warn이 호출됩니다.", async () => {
    const error = new Error(
      "이미지 업로드에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
    (uploadProfileImgToFireStore as jest.Mock).mockRejectedValue(error);
    (customAxios.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await createAccount(mockSignupData);

    expect(toast.warn).toHaveBeenCalledWith(
      "이미지 업로드에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
    expect(customAxios.post).toHaveBeenCalledWith("/api/auth/signup", {
      email: mockSignupData.email,
      password: mockSignupData.password,
      nickname: mockSignupData.nickname,
      introduce: mockSignupData.introduce,
      profileImgData: { url: "/icons/user-icon.svg", name: "" }
    });
    expect(result).toEqual(mockResponse);
  });

  it("회원가입 요청 실패 시 예외를 던집니다.", async () => {
    const error = new Error(
      "회원가입에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
    (uploadProfileImgToFireStore as jest.Mock).mockResolvedValue(
      mockProfileImgData
    );
    (customAxios.post as jest.Mock).mockRejectedValue(error);

    await expect(createAccount(mockSignupData)).rejects.toThrow(
      "회원가입에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
  });
});
