import MetaHead from "@/components/metaHead/meta-head";
import SignupPage from "@/components/signup/signup-page";
import { getMetaDataURL } from "@/lib/getMetaData";

export default function Signup() {
  return (
    <>
      <MetaHead title="회원가입" url={getMetaDataURL("signup")} />
      <SignupPage />
    </>
  );
}
