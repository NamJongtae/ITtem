import ProductManagePage, {
  ProductManageDeatilMenu,
} from "@/components/product-manage/product-manage-page";
import { GetServerSideProps } from "next";

interface IProps {
  initalDetailMenu: ProductManageDeatilMenu;
}

export default function ProductManage({ initalDetailMenu }: IProps) {
  return <ProductManagePage initalDetailMenu={initalDetailMenu} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const status = context.query?.status;
  const initalDetailMenu =
    status === "CANCEL_END/RETURN_END"
      ? "취소/반품 내역"
      : status === "TRADING_END"
      ? "거래완료 내역"
      : "거래중";

  return {
    props: { initalDetailMenu },
  };
};
