import dynamic from 'next/dynamic';
import { getDynamicMetaDataURL } from "@/lib/getDynamicMetaData";
import DynamicMetaHead from '@/components/dynamicMetaHead/dynamic-meta-head';
const FindPasswordPage = dynamic(() => import('@/components/findPassword/findPassword-page'));

export default function FindPassword() {
  return (
    <>
      <DynamicMetaHead title="비밀번호찾기" url={getDynamicMetaDataURL("findpassword")} />
      <FindPasswordPage />
    </>
  );
}
