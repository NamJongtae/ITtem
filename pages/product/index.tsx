import DynamicMetaHead from "@/components/dynamicMetaHead/dynamic-meta-head";
import ProductPage from "@/components/product/product-page";
import { getDynamicMetaData } from "@/lib/getDynamicMetaData";
import { MetaData } from "@/types/metaDataTypes";
import { GetServerSideProps } from "next";

interface IProps {
  metaData: MetaData;
}

export default function Product({ metaData }: IProps) {
  return (
    <>
      <DynamicMetaHead {...metaData} />
      <ProductPage />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { resolvedUrl, query } = context;
  const category = query?.category;
  const metaData = getDynamicMetaData({
    url: resolvedUrl,
    title: category ? `상품-${category}` : "상품-전체",
  });
  return {
    props: { metaData },
  };
};
