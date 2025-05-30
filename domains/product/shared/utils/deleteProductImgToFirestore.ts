import { getStorageInstance } from "@/shared/common/utils/firebaseSetting";

export default async function deleteProductImgToFirestore(
  productDataImgName: string[],
  prevImgDataImgName: string[]
) {
  const removeImgPromise = [];
  const firebaseStorage = await import("firebase/storage");
  const storage = await getStorageInstance();
  const { deleteObject, ref: storageRef } = firebaseStorage;
  for (let i = 0; i < productDataImgName.length; i++) {
    if (!prevImgDataImgName.includes(productDataImgName[i])) {
      removeImgPromise.push(
        deleteObject(
          storageRef(storage, `images/product/${productDataImgName[i]}`)
        )
      );
    }
  }
  await Promise.all(removeImgPromise);
}
