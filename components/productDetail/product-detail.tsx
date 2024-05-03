"use client";

import CategoryNav from "../commons/category/category-nav";
import PrductDateilContent from "./prduct-dateil-content";
import ProductDeatilDescrtion from "./product-deatil-descrtion";
import ProductDeatilSeller from "./product-deatil-seller";
import {
  ProductCategory,
  ProductCondition,
  ProductData,
  ProductSellType,
  ProductStatus,
  ProductTransaction,
} from "@/types/productTypes";

const DUMMY_DATA: ProductData = {
  id: "123",
  name: "아이폰",
  description:
    "사용한지 얼마 안 된 아이폰입니다. 택배, 직거래 모두 가능합니다.",
  uid: "123",
  createdAt: new Date("2024. 04. 21."),
  status: ProductStatus.sold,
  block: false,
  reportCount: 0,
  likeCount: 0,
  likeUserList: [],
  viewCount: 1,
  sellType: ProductSellType.중고거래,
  category: ProductCategory.전자기기,
  imgData: [
    {
      url: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "1",
    },
    {
      url: "https://images.unsplash.com/photo-1578262825743-a4e402caab76?ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80",
      name: "2",
    },
  ],
  price: 10000,
  location: "서울 강남구",
  condition: ProductCondition.A,
  returnPolicy: "가능",
  transaction: ProductTransaction.직거래,
  deliveryFee: "포함",
};

export default function ProductDetailPage() {

  return (
    <>
      <div className="pt-8 pb-12">
        <div className="relative container mx-auto px-6 max-w-[1024px]">
          <CategoryNav className={"max-w-7xl mx-auto mb-5"} />
          <PrductDateilContent productData={DUMMY_DATA} />
          <div className="container mt-16 flex flex-col xl:flex-row border-t-2 border-solid border-black justify-between gap-10 xl:gap-5 pt-10 mx-auto max-w-7xl">
            <ProductDeatilDescrtion />
            <ProductDeatilSeller />
          </div>
        </div>
      </div>
    </>
  );
}
