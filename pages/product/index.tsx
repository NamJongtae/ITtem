import MetaHead from "@/components/metaHead/meta-head";
import ProductPage from "@/components/product/product-page";
import { getMetaData } from "@/lib/getMetaData";
import { MetaData } from "@/types/metaDataTypes";
import { GetServerSideProps } from "next";

interface IProps {
  metaData: MetaData;
}

export default function Product({ metaData }: IProps) {
  return (
    <>
      <MetaHead {...metaData} />
      <ProductPage />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { resolvedUrl, query } = context;
  const category = query?.category;
  const metaData = getMetaData({
    url: resolvedUrl,
    title: category ? `상품-${category}` : "상품-전체",
  });
  return {
    props: { metaData },
  };
};
