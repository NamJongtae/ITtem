import { PurchaseTradingData, SaleTradingData } from "@/types/productTypes";
import Image from "next/image";
import ProductManageItemDate from "./product-manage-item-date";
import { useRouter } from "next/router";
import ProductManageItemBtns from "./product-manage-item-btns";
import {
  ProductManageDeatilMenu,
  ProductManageMenu,
} from "./product-manage-page";

interface IProps {
  tradingData: SaleTradingData | PurchaseTradingData;
  menu: ProductManageMenu;
  detailMenu: ProductManageDeatilMenu;
}

export default function ProductManageItem({
  tradingData,
  menu,
  detailMenu,
}: IProps) {
  const router = useRouter();
  const status = router.query?.status;

  return (
    <li className="flex gap-3 flex-col sm:flex-row sm:items-center sm:justify-between border-b py-5">
      <div className="flex gap-3 items-center">
        <Image
          className="w-32 h-32 object-cover object-center"
          src={tradingData.productData.imgData[0].url}
          alt=""
          width={120}
          height={120}
        />
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex">
            <span className="inline-block w-16">상품명</span>
            <span className="line-clamp-1">{tradingData.productData.name}</span>
          </div>
          <div>
            <span className="inline-block w-16">가격</span>
            <span>{tradingData.productData.price}</span>원
          </div>
          {status === "TRADING" && (
            <div>
              <span className="inline-block w-16">진행상태</span>
              <span>{tradingData.process} </span>
            </div>
          )}
          {tradingData.cancelReason && (
            <div>
              <span className="inline-block w-16">취소사유</span>
              <span>{tradingData.cancelReason}</span>
            </div>
          )}
          {tradingData.returnReason && (
            <div>
              <span className="inline-block w-16">반품사유</span>
              <span>{tradingData.returnReason}</span>
            </div>
          )}
          <ProductManageItemDate tradingData={tradingData} />
        </div>
      </div>

      <ProductManageItemBtns
        tradingData={tradingData}
        menu={menu}
        detailMenu={detailMenu}
      />
    </li>
  );
}
