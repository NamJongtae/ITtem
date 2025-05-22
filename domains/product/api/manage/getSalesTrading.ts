import { AxiosResponse } from "axios";
import { SalesTradingResponseData } from "../../types/reponse-types";
import { TradingStatus } from "../../types/product-types";
import customAxios from "@/utils/customAxios";

export default async function getSalesTrading({
  status = TradingStatus.TRADING,
  cursor = null,
  limit = 10,
  search
}: {
  status?: string;
  cursor?: unknown;
  search?: string;
  limit?: number;
}): Promise<AxiosResponse<SalesTradingResponseData>> {
  try {
    const response = await customAxios(
      `/api/trading/sales?status=${status}${search ? `&search=${search}` : ""}${
        cursor ? `&cursor=${cursor}&limit=${limit}` : `&limit=${limit}`
      }`
    );
    return response;
  } catch (error) {
    throw error;
  }
}
