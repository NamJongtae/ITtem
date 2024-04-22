import Loading from "@/components/commons/loading";
import { useSearchParams } from "next/navigation";
import { useEffect } from 'react';

export default function GoogleAuth() {
  const params = useSearchParams();
  const code = params.get("code");

  useEffect(()=>{
    console.log(code);
  },[code])

  return <Loading />;
}
