import MetaHead from "@/components/metaHead/meta-head";
import ProductManagePage, {
  ProductManageDeatilMenu,
} from "@/components/product-manage/product-manage-page";
import { getMetaData } from "@/lib/getMetaData";
import { GetServerSideProps } from "next";

interface IProps {
  initalDetailMenu: ProductManageDeatilMenu;
  metaData: any;
}

export default function ProductManage({ initalDetailMenu, metaData }: IProps) {
  return (
    <>
      <MetaHead {...metaData} />
      <ProductManagePage initalDetailMenu={initalDetailMenu} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const status = context.query?.status;
  const { resolvedUrl } = context;

  const initalDetailMenu =
    status === "CANCEL_END/RETURN_END"
      ? "취소/반품 내역"
      : status === "TRADING_END"
      ? "거래완료 내역"
      : "거래중";

  const metaData = getMetaData({
    url: resolvedUrl,
    title: `상품관리-${initalDetailMenu}`,
  });

  return {
    props: { initalDetailMenu, metaData },
  };
};
