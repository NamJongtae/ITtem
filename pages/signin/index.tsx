import DynamicMetaHead from "@/components/dynamicMetaHead/dynamic-meta-head";
import { getDynamicMetaDataURL } from "@/lib/getDynamicMetaData";
import { withAuthServerSideProps } from '@/lib/withAuthServerSideProps';
import dynamic from "next/dynamic";
const SigninPage = dynamic(() => import("@/components/signin/signin-page"));

export default function Signin() {
  return (
    <>
      <DynamicMetaHead title="로그인" url={getDynamicMetaDataURL("signin")} />
      <SigninPage />
    </>
  );
}

export const getServerSideProps = withAuthServerSideProps(async (context) => {
  return {
    props: {},
  };
});
