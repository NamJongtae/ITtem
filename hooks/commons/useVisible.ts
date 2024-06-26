import { useRouter } from "next/router";

interface IPrarms {
  pathnames: string[];
}

export default function useVisible({ pathnames }: IPrarms) {
  const router = useRouter();
  const pathname = router.pathname;
  const isVisible = !pathnames.some((path) => pathname.includes(path));
  
  return { isVisible };
}
