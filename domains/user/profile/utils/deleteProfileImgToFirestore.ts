import { getStorageInstance } from "@/shared/common/utils/firebaseSetting";

export default async function deleteProfileImgToFirestore(
  profileDataImgName: string,
  prevImgDataImgName: string
) {
  try {
    const firebaseStorage = await import("firebase/storage");
    const storage = await getStorageInstance();
    const { deleteObject, ref: storageRef } = firebaseStorage;

    if (!profileDataImgName || !prevImgDataImgName) return;
    if (profileDataImgName !== prevImgDataImgName) {
      await deleteObject(
        storageRef(storage, `images/profile/${prevImgDataImgName}`)
      );
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
