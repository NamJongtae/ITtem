import { Fragment, useState } from "react";
import ProductItem from "./product-item";
import {
  ProductCategory,
  ProductCondition,
  ProductSellType,
  ProductData,
  ProductTransaction,
  ProductStatus,
} from "@/types/productTypes";
import ProductListPlaceholder from "../productListPlaceholder/product-list-placeholder";

const DATA: ProductData[] = [
  {
    id: 1,
    name: "아이폰12",
    description:
      "사용한지 얼마 안 된 아이폰12 입니다. 택배, 직거래 모두 가능합니다.",
    userName: "Jon",
    createdAt: new Date("2024-03-21"),
    status: ProductStatus.sold,
    report: false,
    reportCount: 0,
    likeCount: 0,
    likeUserList: [],
    viewCount: 1,
    imgUrls: [
      "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWgefHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1522205955123-895f7c4e5057?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    sellType: ProductSellType.중고거래,
    category: ProductCategory.전자기기,
    price: 800000,
    location: "서울 강남구",
    condition: ProductCondition.A,
    returnPolicy: true,
    transaction: ProductTransaction.직거래,
    deliveryFee: false,
  },
  {
    id: 2,
    name: "삼성 노트북",
    description: "성능 좋은 노트북 판매합니다.",
    userName: "Jane",
    createdAt: new Date("2024-03-21"),
    status: ProductStatus.sold,
    report: false,
    reportCount: 0,
    likeCount: 0,
    likeUserList: [],
    viewCount: 2,
    imgUrls: [
      "https://images.unsplash.com/photo-1522205955123-895f7c4e5057?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    category: ProductCategory.전자기기,
    price: 500000,
    location: "서울 마포구",
    sellType: ProductSellType.중고거래,
    condition: ProductCondition.A,
    returnPolicy: true,
    transaction: ProductTransaction.택배,
    deliveryFee: true,
  },
  {
    id: 3,
    name: "태블릿",
    description: "가볍게 사용한 태블릿 판매합니다.",
    userName: "Mike",
    createdAt: new Date("2024-03-22"),
    status: ProductStatus.trading,
    report: false,
    reportCount: 0,
    likeCount: 0,
    likeUserList: [],
    viewCount: 3,
    imgUrls: [
      "https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=1684&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    sellType: ProductSellType.중고거래,
    category: ProductCategory.전자기기,
    price: 150000,
    location: "부산 해운대구",
    condition: ProductCondition.B,
    returnPolicy: false,
    transaction: ProductTransaction.모두,
    deliveryFee: false,
  },
  {
    id: 4,
    name: "운동화",
    description: "새 운동화 판매합니다.",
    userName: "Sophia",
    createdAt: new Date("2024-03-23"),
    status: ProductStatus.soldout,
    report: false,
    reportCount: 0,
    likeCount: 0,
    likeUserList: [],
    viewCount: 4,
    imgUrls: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    sellType: ProductSellType.중고거래,
    category: ProductCategory.신발,
    price: 25000,
    location: "대구 수성구",
    condition: ProductCondition.S,
    returnPolicy: true,
    transaction: ProductTransaction.직거래,
    deliveryFee: true,
  },
  {
    id: 5,
    name: "아이패드 7세대",
    description: "아이패드 7세대 판매합니다.",
    userName: "Mike",
    createdAt: new Date("2024-03-23"),
    status: ProductStatus.sold,
    report: false,
    reportCount: 0,
    likeCount: 0,
    likeUserList: [],
    viewCount: 4,
    imgUrls: [
      "https://images.unsplash.com/photo-1557825835-b4527f242af7?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    sellType: ProductSellType.중고거래,
    category: ProductCategory.전자기기,
    price: 250000,
    location: "대구 수성구",
    condition: ProductCondition.S,
    returnPolicy: true,
    transaction: ProductTransaction.직거래,
    deliveryFee: true,
  },
];

export default function ProductList() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="max-w-[1024px] mx-auto pb-12">
      <ul className="grid gap-5 grid-cols-autoFill mt-6 px-8 ">
        {loading ? (
          <ProductListPlaceholder listCount={12} />
        ) : (
          DATA.map((item) => (
            <Fragment key={item.id}>
              <ProductItem data={item} />
            </Fragment>
          ))
        )}
      </ul>
    </div>
  );
}
