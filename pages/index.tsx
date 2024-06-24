import HomePage from "@/components/home/home-page";
import MetaHead from "@/components/metaHead/meta-head";
import { getMetaDataURL } from "@/lib/getMetaData";

export default function Home() {
  return (
    <>
      <MetaHead title="홈" url={getMetaDataURL("")} />
      <HomePage />
    </>
  );
}
