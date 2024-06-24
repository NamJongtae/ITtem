import FindPasswordPage from "@/components/findPassword/findPassword-page";
import MetaHead from "@/components/metaHead/meta-head";
import { getMetaDataURL } from "@/lib/getMetaData";

export default function FindPassword() {
  return (
    <>
      <MetaHead title="비밀번호찾기" url={getMetaDataURL("findpassword")} />
      <FindPasswordPage />
    </>
  );
}
