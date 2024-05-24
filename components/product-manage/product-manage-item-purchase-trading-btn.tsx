import {
  PurchaseCancelProcess,
  PurchaseReturnProcess,
  PurchaseTradingData,
  PurchaseTradingProcess,
} from "@/types/productTypes";

interface IProps {
  tradingData: PurchaseTradingData;
}

export default function ProductManageItemPurchaseTradingBtn({
  tradingData,
}: IProps) {
  if (tradingData.process === PurchaseTradingProcess.판매자확인중) {
    return (
      <div className="flex flex-row justify-end sm:flex-col gap-3">
        <button className="text-sm sm:text-base px-4 py-2 bg-red-500 text-white font-semibold betterhover:hover:bg-red-600">
          채팅하기
        </button>
        <button className="text-sm sm:text-base px-4 py-2 bg-gray-500 text-white font-semibold betterhover:hover:bg-gray-600">
          구매취소
        </button>
      </div>
    );
  } else if (tradingData.process === PurchaseTradingProcess.판매자상품전달중) {
    return (
      <div className="flex flex-row justify-end sm:flex-col gap-3">
        <button className="text-sm sm:text-base px-4 py-2 bg-red-500 text-white font-semibold betterhover:hover:bg-red-600">
          채팅하기
        </button>
        <button className="text-sm sm:text-base px-4 py-2 bg-gray-500 text-white font-semibold betterhover:hover:bg-gray-600">
          구매취소
        </button>
      </div>
    );
  } else if (tradingData.process === PurchaseTradingProcess.상품인수확인) {
    return (
      <div className="flex flex-row justify-end sm:flex-col gap-3">
        <button className="text-sm sm:text-base px-4 py-2 bg-red-500 text-white font-semibold betterhover:hover:bg-red-600">
          상품인수
        </button>
        <button className="text-sm sm:text-base px-4 py-2 bg-gray-500 text-white font-semibold betterhover:hover:bg-gray-600">
          환불요청
        </button>
      </div>
    );
  } else if (tradingData.process === PurchaseCancelProcess.취소요청) {
    return (
      <div className="flex flex-row justify-end sm:flex-col gap-3">
        <button className="text-sm sm:text-base px-4 py-2 bg-gray-500 text-white font-semibold betterhover:hover:bg-gray-600">
          취소철회
        </button>
      </div>
    );
  } else if (tradingData.process === PurchaseReturnProcess.판매자확인중) {
    return (
      <div className="flex flex-row justify-end sm:flex-col gap-3">
        <button className="text-sm sm:text-base px-4 py-2 bg-gray-500 text-white font-semibold betterhover:hover:bg-gray-600">
          환불철회
        </button>
      </div>
    );
  } else if (tradingData.process === PurchaseReturnProcess.반품상품전달확인) {
    return (
      <div className="flex flex-row justify-end sm:flex-col gap-3">
        <button className="text-sm sm:text-base px-4 py-2 bg-gray-500 text-white font-semibold betterhover:hover:bg-gray-600">
          상품전달 확인
        </button>
        <button className="text-sm sm:text-base px-4 py-2 bg-gray-500 text-white font-semibold betterhover:hover:bg-gray-600">
          환불철회
        </button>
      </div>
    );
  } else if (tradingData.process === PurchaseReturnProcess.판매자반품상품인수확인중) {
    return (
      <div className="flex flex-row justify-end sm:flex-col gap-3">
        <button className="text-sm sm:text-base px-4 py-2 bg-gray-500 text-white font-semibold betterhover:hover:bg-gray-600">
          채팅하기
        </button>
      </div>
    );
  }
  return null;
}
