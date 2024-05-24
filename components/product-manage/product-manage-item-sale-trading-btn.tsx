import {
  SaleTradingData,
  SalesCancelProcess,
  SalesReturnProcess,
  SalesTradingProcess,
} from "@/types/productTypes";

interface IProps {
  tradingData: SaleTradingData;
}

export default function ProductManageItemSaleTradingBtn({
  tradingData,
}: IProps) {
  if (tradingData.process === SalesTradingProcess.판매중) {
    return (
      <div className="flex flex-row justify-end sm:flex-col gap-3">
        <button className="text-sm sm:text-base px-4 py-2 bg-red-500 text-white font-semibold betterhover:hover:bg-red-600">
          수정하기
        </button>
        <button className="text-sm sm:text-base px-4 py-2 bg-gray-500 text-white font-semibold betterhover:hover:bg-gray-600">
          삭제하기
        </button>
      </div>
    );
  } else if (tradingData.process === SalesTradingProcess.구매요청확인) {
    return (
      <div className="flex flex-row justify-end sm:flex-col gap-3">
        <button className="text-sm sm:text-base px-4 py-2 bg-red-500 text-white font-semibold betterhover:hover:bg-red-600">
          구매요청 확인
        </button>
        <button className="text-sm sm:text-base px-4 py-2 bg-gray-500 text-white font-semibold betterhover:hover:bg-gray-600">
          구매요청 거절
        </button>
      </div>
    );
  } else if (tradingData.process === SalesTradingProcess.상품전달확인) {
    return (
      <div className="flex flex-row justify-end sm:flex-col gap-3">
        <button className="text-sm sm:text-base px-4 py-2 bg-red-500 text-white font-semibold betterhover:hover:bg-red-600">
          상품전달 확인
        </button>
      </div>
    );
  } else if (tradingData.process === SalesTradingProcess.구매자상품인수중) {
    return (
      <div className="flex flex-row justify-end sm:flex-col gap-3">
        <button className="text-sm sm:text-base px-4 py-2 bg-red-500 text-white font-semibold betterhover:hover:bg-red-600">
          채팅하기
        </button>
      </div>
    );
  } else if (tradingData.process === SalesCancelProcess.취소요청확인) {
    return (
      <div className="flex flex-row justify-end sm:flex-col gap-3">
        <button className="text-sm sm:text-base px-4 py-2 bg-red-500 text-white font-semibold betterhover:hover:bg-red-600">
          취소요청 확인
        </button>
        <button className="text-sm sm:text-base px-4 py-2 bg-gray-500 text-white font-semibold betterhover:hover:bg-gray-600">
          취소요청 거절
        </button>
      </div>
    );
  } else if (tradingData.process === SalesReturnProcess.반품요청확인) {
    return (
      <div className="flex flex-row justify-end sm:flex-col gap-3">
        <button className="text-sm sm:text-base px-4 py-2 bg-red-500 text-white font-semibold betterhover:hover:bg-red-600">
          반품요청 확인
        </button>
        <button className="text-sm sm:text-base px-4 py-2 bg-gray-500 text-white font-semibold betterhover:hover:bg-gray-600">
          반품요청 거절
        </button>
      </div>
    );
  } else if (tradingData.process === SalesReturnProcess.구매자반품상품전달중) {
    return (
      <div className="flex flex-row justify-end sm:flex-col gap-3">
        <button className="text-sm sm:text-base px-4 py-2 bg-red-500 text-white font-semibold betterhover:hover:bg-red-600">
          채팅하기
        </button>
      </div>
    );
  } else if (
    tradingData.process === SalesReturnProcess.판매자반품상품인수확인
  ) {
    return (
      <div className="flex flex-row justify-end sm:flex-col gap-3">
        <button className="text-sm sm:text-base px-4 py-2 bg-red-500 text-white font-semibold betterhover:hover:bg-red-600">
          반품상품인수 확인
        </button>
        <button className="text-sm sm:text-base px-4 py-2 bg-gray-500 text-white font-semibold betterhover:hover:bg-gray-600">
          반품거절
        </button>
      </div>
    );
  }
  return null;
}
