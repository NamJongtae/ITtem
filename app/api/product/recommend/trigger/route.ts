import customAxios from "@/utils/customAxios";
import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const CORN_KEY = process.env.CRON_SECRET;

  if (
    req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const response = await customAxios.post(
      `/api/product/recommend`,
      {},
      {
        headers: { Authorization: `Bearer ${CORN_KEY}` }
      }
    );
    return NextResponse.json(
      {
        message: response.data.message,
        products: response.data.products
      },
      { status: response.status }
    );
  } catch (error) {
    if (isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "알 수 없는 에러가 발생했어요.";

      return NextResponse.json(
        { message: errorMessage },
        { status: error.response?.status || 500 }
      );
    }
  }
}
