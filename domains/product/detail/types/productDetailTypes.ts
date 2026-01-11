import { ProductData } from "../../shared/types/productTypes";

export interface ProductDetailAuthData {
  uid: string;
  nickname: string;
  profileImg: string;
  followers: string[];
  isFollow: boolean;
  reviewPercentage: number;
  recentProducts: ProductData[];
}

export interface ProductDetailData extends ProductData {
  auth: ProductDetailAuthData;
}
