import { ObjectId } from 'mongodb';

export enum ProductCategory {
  전체 = "전체",
  의류 = "의류",
  가방지갑 = "가방/지갑",
  신발 = "신발",
  시계 = "시계",
  스포츠 = "스포츠",
  악세사리 = "악세사리",
  악기음반 = "악기/음반",
  도서 = "도서",
  공구 = "공구",
  생활용품 = "생활용품",
  식품 = "식품",
  전자기기 = "전자기기",
}

export enum ProductCondition {
  S = "S",
  A = "A",
  B = "B",
  C = "C",
  D = "D",
}

export enum ProductTransaction {
  직거래 = "직거래",
  택배 = "택배",
  모두 = "모두",
}

export enum ProductSellType {
  중고거래 = "중고거래",
  무료나눔 = "무료나눔",
}

export enum ProductStatus {
  soldout = "soldout",
  trading = "trading",
  sold = "sold",
}

export type ProductLocation = { address_name: string; x: number; y: number };

export interface ProductData {
  id: number;
  name: string;
  description: string;
  userName: string;
  date: string;
  status: ProductStatus;
  report: boolean;
  reportCount: number;
  likeCount: number;
  likeUserList: string[];
  viewCount: number;
  imgUrls: string[];
  price: number;
  location: string;
  sellType: ProductSellType;
  category: ProductCategory;
  condition: ProductCondition;
  returnPolicy: boolean;
  transaction: ProductTransaction;
  deliveryFee: boolean;
}
