import { useRouter } from "next/router";

interface IParams {
  pathnames: string[];
}

export default function useVisible({ pathnames }: IParams) {
  const router = useRouter();
  const pathname = router.pathname;
  const isVisible = !pathnames.some((path) => pathname.includes(path));
  
  return { isVisible };
}
