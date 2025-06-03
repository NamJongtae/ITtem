import { uploadProfileImgToFireStore } from "../../../utils/uploadProfileImgToFireStore";
import { getStorageInstance } from "@/shared/common/utils/firebaseSetting";
import {
  uploadBytes,
  ref as storageRef,
  getDownloadURL
} from "firebase/storage";

jest.mock("firebase/storage", () => ({
  uploadBytes: jest.fn(),
  ref: jest.fn(),
  getDownloadURL: jest.fn()
}));

jest.mock("@/shared/common/utils/firebaseSetting", () => ({
  getStorageInstance: jest.fn()
}));

jest.mock("uuid", () => ({
  v4: jest.fn(() => "mock-uuid")
}));

describe("uploadProfileImgToFireStore", () => {
  const mockStorage = {};
  const mockFile = new File(["dummy content"], "profile.png", {
    type: "image/png"
  });
  const mockFileName = "mock-uuid_profile.png";
  const mockRef = { path: "images/profile/" + mockFileName };
  const mockUploadResult = { ref: mockRef };
  const mockUrl = "https://mock-storage.com/images/profile/" + mockFileName;

  beforeEach(() => {
    jest.clearAllMocks();
    (getStorageInstance as jest.Mock).mockResolvedValue(mockStorage);
    (storageRef as jest.Mock).mockReturnValue(mockRef);
    (uploadBytes as jest.Mock).mockResolvedValue(mockUploadResult);
    (getDownloadURL as jest.Mock).mockResolvedValue(mockUrl);
  });

  it("파일을 정상적으로 업로드하고 URL과 이름을 반환합니다.", async () => {
    const result = await uploadProfileImgToFireStore(mockFile);

    expect(getStorageInstance).toHaveBeenCalled();
    expect(storageRef).toHaveBeenCalledWith(
      mockStorage,
      `images/profile/${mockFileName}`
    );

    // 파일이 업로드 되었는지 확인
    expect(uploadBytes).toHaveBeenCalledWith(mockRef, mockFile);

    // 업로드된 파일 url 확인
    expect(getDownloadURL).toHaveBeenCalledWith(mockRef);

    // uploadProfileImgToFireStore 반환값 확인
    expect(result).toEqual({
      url: mockUrl,
      name: mockFileName
    });
  });

  it("빈 파일이 전달되면 undefined를 반환합니다.", async () => {
    const result = await uploadProfileImgToFireStore("");
    expect(result).toBeUndefined();
    expect(uploadBytes).not.toHaveBeenCalled();
    expect(getDownloadURL).not.toHaveBeenCalled();
  });

  it("업로드 중 에러 발생 시 예외를 thorw합니다.", async () => {
    (uploadBytes as jest.Mock).mockRejectedValueOnce(
      new Error("Upload failed")
    );

    await expect(uploadProfileImgToFireStore(mockFile)).rejects.toThrow(
      "이미지 업로드에 실패했어요\n잠시 후 다시 시도해주세요."
    );
  });
});
