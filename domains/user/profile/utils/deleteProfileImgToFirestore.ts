import { getStorageInstance } from "@/shared/common/utils/firebaseSetting";

export default async function deleteProfileImgToFirestore(
  prevProfileImgDataImgName: string
) {
  try {
    const firebaseStorage = await import("firebase/storage");
    const storage = await getStorageInstance();
    const { deleteObject, ref: storageRef } = firebaseStorage;

    if (!prevProfileImgDataImgName) return;

    await deleteObject(
      storageRef(storage, `images/profile/${prevProfileImgDataImgName}`)
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
}
