import { UploadImgResponseData } from "@/domains/product/upload/types/productUploadTypes";
import { getStorageInstance } from "@/shared/common/utils/firebaseSetting";
import { v4 as uuid } from "uuid";

export default async function uploadMultiProductImgToFirestore(
  files: File[]
): Promise<UploadImgResponseData[] | undefined> {
  try {
    if (!files) return;
    const firebaseStorage = await import("firebase/storage");
    const { uploadBytes, ref: storageRef, getDownloadURL } = firebaseStorage;
    const uploadPromises = [...files].map(async (file) => {
      // 각 파일에 대해 비동기 업로드 처리
      const fileName = `${uuid()}_${file.name}`;
      const storage = await getStorageInstance();
      const uploadImgResponse = await uploadBytes(
        storageRef(storage, `images/product/${fileName}`),
        file
      );
      const url = await getDownloadURL(uploadImgResponse.ref);
      return { url, name: fileName } as UploadImgResponseData;
    });

    // 모든 파일이 업로드되길 기다립니다.
    const uploadResults = await Promise.all(uploadPromises);
    return uploadResults;
  } catch (error) {
    console.error(error);
    throw new Error("이미지 업로드에 실패했어요\n잠시 후 다시 시도해주세요.");
  }
}
