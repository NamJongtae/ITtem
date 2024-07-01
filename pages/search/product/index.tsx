import DynamicMetaHead from "@/components/dynamicMetaHead/dynamic-meta-head";
import { getDynamicMetaData } from "@/lib/getDynamicMetaData";
import { MetaData } from "@/types/metaDataTypes";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
const SearchPage = dynamic(() => import("@/components/search/search-page"));

interface IProps {
  metaData: MetaData;
}

export default function Search({ metaData }: IProps) {
  return (
    <>
      <DynamicMetaHead {...metaData} />
      <SearchPage />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { resolvedUrl, query } = context;
  const category = query?.category || "전체";
  const keyword = query?.keyword;
  const title = keyword
    ? `상품검색-${keyword}-${category}`
    : `상품-${category}`;

  const metaData = getDynamicMetaData({
    url: resolvedUrl,
    title,
  });
  return {
    props: { metaData },
  };
};
