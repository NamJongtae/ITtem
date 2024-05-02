import { uploadMultiImgToFirestore } from "@/lib/api/firebase";
import {
  ProductData,
  ProductImgData,
  ProductStatus,
} from "@/types/productTypes";
import { v4 as uuid } from "uuid";
import { FieldValues } from "react-hook-form";
import useProductUploadMutate from "../querys/useProductUploadMutate";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function useProductUploadSubmit() {
  const { productUploadMuate, productUploadLoading } = useProductUploadMutate();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleClickProductUploadSubmit = async (values: FieldValues) => {
    const imgData = (await uploadMultiImgToFirestore(values.img)) as
      | ProductImgData[]
      | undefined;

    const productData: ProductData = {
      id: uuid(),
      name: values.name,
      description: values.desc,
      userName: user?.nickname || "",
      createdAt: new Date(),
      status: ProductStatus.sold,
      block: false,
      reportCount: 0,
      likeCount: 0,
      likeUserList: [],
      viewCount: 0,
      imgData: imgData || [],
      price: parseInt(values.price, 10),
      location: values.location,
      sellType: values.sellType,
      category: values.category,
      condition: values.condition,
      returnPolicy: values.returnPolicy,
      transaction: values.transaction,
      deliveryFee: values.deliveryFee,
    };

    productUploadMuate(productData);
  };

  return { handleClickProductUploadSubmit, productUploadLoading};
}
