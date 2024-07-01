import DynamicMetaHead from "@/components/dynamicMetaHead/dynamic-meta-head";
import { getDynamicMetaDataURL } from "@/lib/getDynamicMetaData";
import dynamic from "next/dynamic";
const SignupPage = dynamic(() => import("@/components/signup/signup-page"));

export default function Signup() {
  return (
    <>
      <DynamicMetaHead title="회원가입" url={getDynamicMetaDataURL("signup")} />
      <SignupPage />
    </>
  );
}
