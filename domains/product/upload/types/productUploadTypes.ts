import { ProductData } from "../../shared/types/productTypes";

export type ProductUploadData = Omit<
  ProductData,
  | "_id"
  | "status"
  | "createdAt"
  | "wishCount"
  | "wishUserIds"
  | "viewCount"
  | "block"
  | "reportCount"
  | "reportUserIds"
>;

export interface UploadImgResponseData {
  url: string;
  name: string;
}
