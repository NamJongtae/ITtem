import FindPasswordPage from "@/components/findPassword/findPassword-page";
import DynamicMetaHead from "@/components/dynamicMetaHead/dynamic-meta-head";
import { getDynamicMetaDataURL } from "@/lib/getDynamicMetaData";

export default function FindPassword() {
  return (
    <>
      <DynamicMetaHead title="비밀번호찾기" url={getDynamicMetaDataURL("findpassword")} />
      <FindPasswordPage />
    </>
  );
}
