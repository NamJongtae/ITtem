import HomePage from "@/components/home/home-page";
import MetaHead from "@/components/dynamicMetaHead/dynamic-meta-head";
import { getDynamicMetaDataURL } from "@/lib/getDynamicMetaData";

export default function Home() {
  return (
    <>
      <MetaHead title="홈" url={getDynamicMetaDataURL("")} />
      <HomePage />
    </>
  );
}
