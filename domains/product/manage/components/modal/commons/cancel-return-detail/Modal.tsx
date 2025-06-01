import Portal from "@/shared/common/components/Portal";
import {
  SaleTradingData,
  PurchaseTradingData
} from "@/domains/product/manage/types/productManageTypes";
import { isMobile } from "react-device-detect";
import Content from "./Content";
import Reason from "./Reason";
import DateInfo from "./DateInfo";
import CloseBtn from "./CloseBtn";
import { escKeyClose } from "@/shared/common/utils/escKeyClose";

interface IProps {
  tradingData: SaleTradingData | PurchaseTradingData;
  handleClickCloseBtn: () => void;
}

export default function Modal({ tradingData, handleClickCloseBtn }: IProps) {
  return (
    <Portal>
      <div
        onClick={handleClickCloseBtn}
        className="fixed bg-black bg-opacity-50 inset-0 z-30"
        role="modal-backdrop"
      />
      <div
        className={`${
          isMobile ? "h-screen" : "max-w-[480px]"
        } fixed center z-30 flex flex-col gap-2 w-full p-8 border bg-white`}
        onKeyDown={(e) =>
          escKeyClose({ event: e, closeCb: handleClickCloseBtn })
        }
      >
        <h2
          className={`${
            isMobile ? "mt-10" : "mt-3"
          } text-xl text-center font-semibold mb-3`}
        >
          거래 상세 정보
        </h2>

        <Content name="상품명" value={tradingData.productName} />

        <Content
          name="상품가격"
          value={tradingData.productPrice.toLocaleString() + " 원"}
        />

        <Content name="판매자" value={tradingData.sellerInfo.nickname} />

        <Content name="구매자" value={tradingData.buyerInfo.nickname} />

        <Reason tradingData={tradingData} />

        <DateInfo tradingData={tradingData} />

        <Content name="거래 번호" value={tradingData._id} />

        <Content name="상품 번호" value={tradingData.productId} />

        <p className="text-sm text-gray-400">
          * 거래 정보가 상이한 경우 고객센터로 문의 바랍니다.
        </p>

        <CloseBtn handleClickCloseBtn={handleClickCloseBtn} />
      </div>
    </Portal>
  );
}
