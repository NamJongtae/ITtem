
import DynamicMetaHead from '@/components/dynamicMetaHead/dynamic-meta-head';
import SignupPage from "@/components/signup/signup-page";
import { getDynamicMetaDataURL } from "@/lib/getDynamicMetaData";

export default function Signup() {
  return (
    <>
      <DynamicMetaHead title="회원가입" url={getDynamicMetaDataURL("signup")} />
      <SignupPage />
    </>
  );
}
