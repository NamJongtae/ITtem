import customAxios from "@/utils/customAxios";
import { AxiosResponse } from "axios";
import { ReportProductResponseData } from "../types/reponse-types";

export default async function reportProduct(
  id: string
): Promise<AxiosResponse<ReportProductResponseData>> {
  try {
    const response = await customAxios.patch(`/api/product/${id}/report`);
    return response;
  } catch (error) {
    throw error;
  }
}
