import { PurchaseTradingResponseData, SalesTradingResponseData } from '@/types/apiTypes';
import { TradingStatus } from '@/types/productTypes';
import { AxiosResponse } from 'axios';
import customAxios from '../customAxios';

export async function purchaseRequestConfirmation(
  productId: string
): Promise<AxiosResponse<{ message: string }>> {
  try {
    const response = await customAxios.patch(
      `/api/trading/sales/${productId}/purchase-request-confirmation`
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function purchaseRequestReject(
  productId: string,
  cancelReason: string
): Promise<AxiosResponse<{ message: string }>> {
  try {
    const response = await customAxios.patch(
      `/api/trading/sales/${productId}/purchase-request-reject`,
      {
        cancelReason,
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function productDeliveryConfirmation(
  productId: string
): Promise<AxiosResponse<{ message: string }>> {
  try {
    const response = await customAxios.patch(
      `/api/trading/sales/${productId}/delivery-confirmation`
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function purchaseCancelConfirmation(
  productId: string
): Promise<AxiosResponse<{ message: string }>> {
  try {
    const response = await customAxios.patch(
      `/api/trading/sales/${productId}/cancel-comfirmation`
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function purchaseCancelReject(
  productId: string,
  rejectReason: string
): Promise<AxiosResponse<{ message: string }>> {
  try {
    const response = await customAxios.patch(
      `/api/trading/sales/${productId}/cancel-reject`,
      {
        rejectReason,
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function productReturnConfirmation(
  productId: string
): Promise<AxiosResponse<{ message: string }>> {
  try {
    const response = await customAxios.patch(
      `/api/trading/sales/${productId}/return-confirmation`
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function productReturnReceiptConfirmation(
  productId: string
): Promise<AxiosResponse<{ message: string }>> {
  try {
    const response = await customAxios.patch(
      `/api/trading/sales/${productId}/return-receipt-confirmation`
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function productReturnReject(
  productId: string,
  rejectReason: string
): Promise<AxiosResponse<{ message: string }>> {
  try {
    const response = await customAxios.patch(
      `/api/trading/sales/${productId}/return-reject`,
      {
        rejectReason,
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function productReceiptConfirmation(
  productId: string
): Promise<AxiosResponse<{ message: string }>> {
  try {
    const response = await customAxios.patch(
      `/api/trading/purchase/${productId}/product-receipt-confirmation`
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function purchaseCancelRequest(
  productId: string,
  cancelReason: string
): Promise<AxiosResponse<{ message: string }>> {
  try {
    const response = await customAxios.patch(
      `/api/trading/purchase/${productId}/cancel`,
      {
        cancelReason,
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function purchaseCancelRequestWithdrawal(
  productId: string
): Promise<AxiosResponse<{ message: string }>> {
  try {
    const response = await customAxios.patch(
      `/api/trading/purchase/${productId}/cancel/withdrawal`
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function productReturnRequest(
  productId: string,
  returnReason: string
): Promise<AxiosResponse<{ message: string }>> {
  try {
    const response = await customAxios.patch(
      `/api/trading/purchase/${productId}/return`,
      {
        returnReason,
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function productReturnDeliveryConfirmation(
  productId: string
): Promise<AxiosResponse<{ message: string }>> {
  try {
    const response = await customAxios.patch(
      `/api/trading/purchase/${productId}/return/delivery-confirmation`
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function productReturnRequestWithdrawal(
  productId: string
): Promise<AxiosResponse<{ message: string }>> {
  try {
    const response = await customAxios.patch(
      `/api/trading/purchase/${productId}/return/withdrawal`
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getSalesTrading({
  status = TradingStatus.TRADING,
  cursor,
  limit = 10,
  search,
}: {
  status?: string;
  cursor: unknown;
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

export async function getPurchaseTrading({
  status = TradingStatus.TRADING,
  cursor,
  limit = 10,
  search,
}: {
  status?: string;
  cursor: unknown;
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