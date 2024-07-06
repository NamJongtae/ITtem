import DynamicMetaHead from "@/components/dynamicMetaHead/dynamic-meta-head";
import { getDynamicMetaData } from "@/lib/getDynamicMetaData";
import { withAuthServerSideProps } from "@/lib/withAuthServerSideProps";
import { MetaData } from "@/types/metaDataTypes";
import dynamic from "next/dynamic";
const ProductPage = dynamic(() => import("@/components/product/product-page"));

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

export const getServerSideProps = withAuthServerSideProps(async (context) => {
  const { resolvedUrl, query } = context;
  const category = query?.category;
  const metaData = getDynamicMetaData({
    url: resolvedUrl,
    title: category ? `상품-${category}` : "상품-전체",
  });
  return {
    props: { metaData },
  };
});
