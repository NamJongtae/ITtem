import DynamicMetaHead from "@/components/dynamicMetaHead/dynamic-meta-head";
import { ProductManageDeatilMenu } from "@/components/product-manage/product-manage-page";
import { getDynamicMetaData } from "@/lib/getDynamicMetaData";
import { withAuthServerSideProps } from "@/lib/withAuthServerSideProps";
import dynamic from "next/dynamic";
const ProductManagePage = dynamic(
  () => import("@/components/product-manage/product-manage-page")
);

interface IProps {
  initalDetailMenu: ProductManageDeatilMenu;
  metaData: any;
}

export default function ProductManage({ initalDetailMenu, metaData }: IProps) {
  return (
    <>
      <DynamicMetaHead {...metaData} />
      <ProductManagePage initalDetailMenu={initalDetailMenu} />
    </>
  );
}

export const getServerSideProps = withAuthServerSideProps(async (context) => {
  const status = context.query?.status;
  const { resolvedUrl } = context;

  const initalDetailMenu =
    status === "CANCEL_END/RETURN_END"
      ? "취소/반품 내역"
      : status === "TRADING_END"
      ? "거래완료 내역"
      : status === "CANCEL_REJECT/RETURN_REJECT"
      ? "취소/반품 거절 내역"
      : "거래중";

  const metaData = getDynamicMetaData({
    url: resolvedUrl,
    title: `상품관리-${initalDetailMenu}`,
  });

  return {
    props: { initalDetailMenu, metaData },
  };
});
