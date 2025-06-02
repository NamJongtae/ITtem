import deleteProductImgsToFirestore from "../../../utils/deleteProductImgsToFirestore";
import { getStorageInstance } from "@/shared/common/utils/firebaseSetting";

jest.mock("@/shared/common/utils/firebaseSetting", () => ({
  getStorageInstance: jest.fn()
}));

jest.mock("firebase/storage", () => ({
  ref: jest.fn(),
  deleteObject: jest.fn()
}));

import { ref as storageRef, deleteObject } from "firebase/storage";

describe("deleteProductImgsToFirestore 함수 테스트", () => {
  const mockStorage = {};
  const mockRef = (path: string) => ({ fullPath: path });

  beforeEach(() => {
    jest.clearAllMocks();
    (getStorageInstance as jest.Mock).mockResolvedValue(mockStorage);
    (storageRef as jest.Mock).mockImplementation((storage, path) =>
      mockRef(path)
    );
    (deleteObject as jest.Mock).mockResolvedValue(undefined);
  });

  it("삭제할 이미지가 있을 경우 deleteObject가 호출됩니다.", async () => {
    const productDataImgName = ["a.jpg", "b.jpg", "c.jpg"]; 
    const productEditImgDataImgName = ["a.jpg"];

    await deleteProductImgsToFirestore(
      productDataImgName,
      productEditImgDataImgName
    );

    expect(deleteObject).toHaveBeenCalledTimes(2);
    expect(deleteObject).toHaveBeenCalledWith(
      expect.objectContaining({ fullPath: "images/product/b.jpg" })
    );
    expect(deleteObject).toHaveBeenCalledWith(
      expect.objectContaining({ fullPath: "images/product/c.jpg" })
    );
  });

  it("삭제할 이미지가 없을 경우 deleteObject가 호출되지 않습니다.", async () => {
    const productDataImgName = ["x.jpg", "y.jpg"];
    const productEditImgDataImgName = ["x.jpg", "y.jpg"];

    await deleteProductImgsToFirestore(
      productDataImgName,
      productEditImgDataImgName
    );

    expect(deleteObject).not.toHaveBeenCalled();
  });
});
