import MetaHead from "@/components/metaHead/meta-head";
import SigninPage from "@/components/signin/signin-page";
import { getMetaDataURL } from "@/lib/getMetaData";

export default function Signin() {
  return (
    <>
      <MetaHead title="로그인" url={getMetaDataURL("signin")} />
      <SigninPage />
    </>
  );
}
