import { AxiosResponse } from "axios";
import { TradingStatus } from "../../types/product-types";
import { PurchaseTradingResponseData } from "../../types/reponse-types";
import customAxios from "@/utils/customAxios";

export default async function getPurchaseTrading({
  status = TradingStatus.TRADING,
  cursor,
  limit = 10,
  search
}: {
  status?: string;
  cursor?: unknown;
  search?: string;
  limit?: number;
}): Promise<AxiosResponse<PurchaseTradingResponseData>> {
  try {
    const response = await customAxios(
      `/api/trading/purchase?status=${status}${
        search ? `&search=${search}` : ""
      }${cursor ? `&cursor=${cursor}&limit=${limit}` : `&limit=${limit}`}`
    );
    return response;
  } catch (error) {
    throw error;
  }
}
