import deleteProfileImgToFirestore from "../../../utils/deleteProfileImgToFirestore";
import { getStorageInstance } from "@/shared/common/utils/firebaseSetting";
import { deleteObject, ref as storageRef } from "firebase/storage";

jest.mock("firebase/storage", () => ({
  deleteObject: jest.fn(),
  ref: jest.fn()
}));

jest.mock("@/shared/common/utils/firebaseSetting", () => ({
  getStorageInstance: jest.fn()
}));

describe("deleteProfileImgToFirestore 함수 테스트", () => {
  const mockStorage = {};
  const mockRef = { path: "images/profile/prevImage.png" };

  beforeEach(() => {
    jest.clearAllMocks();
    (getStorageInstance as jest.Mock).mockResolvedValue(mockStorage);
    (storageRef as jest.Mock).mockReturnValue(mockRef);
    (deleteObject as jest.Mock).mockResolvedValue(undefined);
  });

  it("이전 이미지 파일명이 주어지면 해당 이미지를 삭제합니다.", async () => {
    await deleteProfileImgToFirestore("prevImage.png");

    expect(storageRef).toHaveBeenCalledWith(
      mockStorage,
      "images/profile/prevImage.png"
    );
    expect(deleteObject).toHaveBeenCalledWith(mockRef);
  });

  it("이미지 파일명이 없으면 삭제를 시도하지 않아야 합니다.", async () => {
    await deleteProfileImgToFirestore("");

    expect(storageRef).not.toHaveBeenCalled();
    expect(deleteObject).not.toHaveBeenCalled();
  });

  it("삭제 중 오류가 발생하면 예외를 thorw합니다.", async () => {
    (deleteObject as jest.Mock).mockRejectedValue(new Error("Delete failed"));

    await expect(deleteProfileImgToFirestore("prevImage.png")).rejects.toThrow(
      "Delete failed"
    );
  });
});
