import { UploadImgResponseData } from "@/domains/product/upload/types/productUploadTypes";
import { getStorageInstance } from "@/shared/common/utils/firebaseSetting";
import { v4 as uuid } from "uuid";

export default async function uploadProductImgToFireStore(
  file: File | ""
): Promise<UploadImgResponseData | undefined> {
  try {
    if (file) {
      const firebaseStorage = await import("firebase/storage");
      const storage = await getStorageInstance();
      const { uploadBytes, ref: storageRef, getDownloadURL } = firebaseStorage;
      const fileName = `${uuid()}_${file.name}`;
      const uploadImgResponse = await uploadBytes(
        storageRef(storage, `images/profile/${fileName}`),
        file
      );
      const url =
        uploadImgResponse && (await getDownloadURL(uploadImgResponse.ref));
      if (url) return { url, name: fileName };
    }
  } catch (error) {
    console.error(error);
    throw new Error("이미지 업로드에 실패했어요\n잠시 후 다시 시도해주세요.");
  }
}
