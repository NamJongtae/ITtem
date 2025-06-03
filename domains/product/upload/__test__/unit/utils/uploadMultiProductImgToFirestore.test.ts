import uploadMultiProductImgToFirestore from "@/domains/product/upload/utils/uploadMultiProductImgToFirestore";
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

describe("uploadMultiProductImgToFirestore", () => {
  const mockStorage = {};
  const makeMockFile = (id: number) =>
    new File(["dummy content"], `test${id}.png`, {
      type: "image/png"
    });
  const mockFile1 = makeMockFile(1);
  const mockFile2 = makeMockFile(2);

  const makeMockFileUrl = (id: number) =>
    `images/product/mock-uuid_test${id}.png`;
  const makeMockUrl = (id: number) =>
    `https://mock-storage.com/${makeMockFileUrl(id)}`;
  const mockRef1 = { ref: "mockRef1" };
  const mockRef2 = { ref: "mockRef2" };

  beforeEach(() => {
    jest.clearAllMocks();

    (getStorageInstance as jest.Mock).mockResolvedValue(mockStorage);
  });

  it("여러 이미지를 정상적으로 업로드하고 URL/파일명을 반환합니다.", async () => {
    (storageRef as jest.Mock)
      .mockReturnValueOnce(mockRef1)
      .mockReturnValueOnce(mockRef2);

    (uploadBytes as jest.Mock)
      .mockResolvedValueOnce(mockRef1)
      .mockResolvedValueOnce(mockRef2);

    (getDownloadURL as jest.Mock)
      .mockReturnValueOnce(makeMockUrl(1))
      .mockReturnValueOnce(makeMockUrl(2));
    const result = await uploadMultiProductImgToFirestore([
      mockFile1,
      mockFile2
    ]);

    expect(storageRef).toHaveBeenCalledWith(mockStorage, makeMockFileUrl(1));
    expect(storageRef).toHaveBeenCalledWith(mockStorage, makeMockFileUrl(2));

    expect(getStorageInstance).toHaveBeenCalledTimes(2);

    // 파일이 업로드 되었는지 확인
    expect(uploadBytes).toHaveBeenNthCalledWith(1, mockRef1, mockFile1);
    expect(uploadBytes).toHaveBeenNthCalledWith(2, mockRef2, mockFile2);

    // 업로드된 파일 url 확인
    expect(getDownloadURL).toHaveBeenCalledWith("mockRef1");
    expect(getDownloadURL).toHaveBeenCalledWith("mockRef2");

    // uploadMultiProductImgToFirestore 반환값 확인
    expect(result).toEqual([
      { url: makeMockUrl(1), name: "mock-uuid_test1.png" },
      { url: makeMockUrl(2), name: "mock-uuid_test2.png" }
    ]);
  });

  it("빈 파일 배열이면 빈 배열을 반환합니다.", async () => {
    const result = await uploadMultiProductImgToFirestore([]);
    expect(result).toEqual([]);
  });

  it("업로드 중 에러가 발생하면 예외를 throw합니다.", async () => {
    (uploadBytes as jest.Mock).mockRejectedValueOnce(new Error("Upload fail"));

    await expect(uploadMultiProductImgToFirestore([mockFile1])).rejects.toThrow(
      "이미지 업로드에 실패했어요\n잠시 후 다시 시도해주세요."
    );
  });
});
