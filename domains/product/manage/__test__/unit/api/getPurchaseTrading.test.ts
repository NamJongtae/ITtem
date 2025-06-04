import getPurchaseTrading from "@/domains/product/manage/api/getPurchaseTrading";
import customAxios from "@/shared/common/utils/customAxios";
import { AxiosHeaders, AxiosResponse } from "axios";
import {
  PurchaseTradingData,
  TradingStatus
} from "../../../types/productManageTypes";
import { PurchaseTradingResponseData } from "../../../types/responseTypes";

jest.mock("@/shared/common/utils/customAxios");

describe("getPurchaseTrading", () => {
  const mockResponse: AxiosResponse<PurchaseTradingResponseData> = {
    data: {
      purchaseTrading: [
        {
          _id: "trade1",
          sellerId: "seller123",
          buyerId: "buyer123"
        } as PurchaseTradingData
      ],
      message: "구매 거래 목록 조회에 성공했어요."
    },
    status: 200,
    statusText: "ok",
    headers: {},
    config: {
      headers: new AxiosHeaders()
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("status, search, cursor, limit이 모두 있을 때 쿼리에 포함하여 요청을 보냅니다.", async () => {
    (customAxios as unknown as jest.Mock).mockResolvedValue(mockResponse);

    await getPurchaseTrading({
      status: TradingStatus.TRADING,
      cursor: "cursor123",
      search: "신발",
      limit: 20
    });

    expect(customAxios).toHaveBeenCalledWith(
      `/api/trading/purchase?status=TRADING&search=신발&cursor=cursor123&limit=20`
    );
  });

  it("status, limit 없는 경우에는 기본 인자 값(TRADING, 10)이 쿼리에 포함되고, search, cursor가 없는 경우는 쿼리에 포함되지 않고 요청을 보냅니다.", async () => {
    (customAxios as unknown as jest.Mock).mockResolvedValue(mockResponse);

    await getPurchaseTrading({});

    expect(customAxios).toHaveBeenCalledWith(
      `/api/trading/purchase?status=TRADING&limit=10`
    );
  });

  it("search가 있는 경우 'search'와 status, limit 기본값(TRADING, 10)이 쿼리에 포함되어 요청을 보냅니다.", async () => {
    (customAxios as unknown as jest.Mock).mockResolvedValue(mockResponse);

    await getPurchaseTrading({
      search: "가방"
    });

    expect(customAxios).toHaveBeenCalledWith(
      `/api/trading/purchase?status=TRADING&search=가방&limit=10`
    );
  });

  it("cursor만 있을 경우 'cursor'와 status, limit 기본값(TRADING, 10)이 쿼리에 포함되어 요청을 보냅니다.", async () => {
    (customAxios as unknown as jest.Mock).mockResolvedValue(mockResponse);

    await getPurchaseTrading({
      cursor: "cursor456"
    });

    expect(customAxios).toHaveBeenCalledWith(
      `/api/trading/purchase?status=TRADING&cursor=cursor456&limit=10`
    );
  });

  it("요청 중 에러가 발생하면 예외를 던집니다.", async () => {
    const error = new Error(
      "구매 거래 목록 조회에 실패하였습니다.\n잠시 후 다시 시도해주세요."
    );
    (customAxios as unknown as jest.Mock).mockRejectedValue(error);

    await expect(
      getPurchaseTrading({ status: TradingStatus.TRADING })
    ).rejects.toThrow(error);
  });
});
