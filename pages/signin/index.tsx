import DynamicMetaHead from "@/components/dynamicMetaHead/dynamic-meta-head";
import SigninPage from "@/components/signin/signin-page";
import { getDynamicMetaDataURL } from "@/lib/getDynamicMetaData";

export default function Signin() {
  return (
    <>
      <DynamicMetaHead title="로그인" url={getDynamicMetaDataURL("signin")} />
      <SigninPage />
    </>
  );
}
