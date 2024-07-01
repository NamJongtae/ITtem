import HomePage from "@/components/home/home-page";
import MetaHead from "@/components/dynamicMetaHead/dynamic-meta-head";
import { getDynamicMetaDataURL } from "@/lib/getDynamicMetaData";
import { GetServerSideProps } from "next";
import { withAuthServerSideProps } from "@/lib/withAuthServerSideProps";

export default function Home() {
  return (
    <>
      <MetaHead title="홈" url={getDynamicMetaDataURL("")} />
      <HomePage />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps(
  async (context) => {
    return { props: {} };
  }
);
