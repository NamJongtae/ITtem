import MetaHead from "@/components/metaHead/meta-head";
import SearchPage from "@/components/search/search-page";
import { getMetaData } from "@/lib/getMetaData";
import { MetaData } from "@/types/metaDataTypes";
import { GetServerSideProps } from "next";

interface IProps {
  metaData: MetaData;
}

export default function Search({ metaData }: IProps) {
  return (
    <>
      <MetaHead {...metaData} />
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

  const metaData = getMetaData({
    url: resolvedUrl,
    title,
  });
  return {
    props: { metaData },
  };
};
