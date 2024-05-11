import ProfileDetailWishDelBtn from "./profile-detail-wish-delBtn";
import { useState } from "react";
import ProfileDetailWishList from "./profile-detail-wish-list";
import {
  ProductCategory,
  ProductCondition,
  ProductData,
  ProductSellType,
  ProductStatus,
  ProductTransaction,
} from "@/types/productTypes";

const DUMY_DATA: ProductData[] = [
  {
    _id: "123",
    name: "테스트 상품",
    description: "테스트",
    uid: "123",
    status: ProductStatus.sold,
    reportCount: 0,
    reportUserIds: [],
    wishCount: 0,
    wishUserIds: [],
    viewCount: 0,
    imgData: [
      {
        url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "",
      },
    ],
    price: 10000,
    location: "서울 강남구",
    sellType: ProductSellType.중고거래,
    category: ProductCategory.가방지갑,
    condition: ProductCondition.S,
    returnPolicy: "가능",
    transaction: ProductTransaction.모두,
    deliveryFee: "포함",
    block: false,
    createdAt: new Date(),
  },
];
export default function ProfileDetailWish() {
  const [wishList, setwishList] = useState(
    DUMY_DATA.map((data) => ({ ...data, isChecked: false }))
  );

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setwishList(wishList.map((wish) => ({ ...wish, isChecked })));
  };

  const handleCheckWish = (id: string) => {
    setwishList(
      wishList.map((wish) =>
        wish._id === id ? { ...wish, isChecked: !wish.isChecked } : wish
      )
    );
  };

  return (
    <div className="mt-8 mb-8">
      <h2 className="font-semibold border-b pb-3 mb-3">찜 1개</h2>
      <ProfileDetailWishDelBtn handleSelectAll={handleSelectAll} />
      <ProfileDetailWishList
        wishList={wishList}
        handleCheckWish={handleCheckWish}
      />
    </div>
  );
}
