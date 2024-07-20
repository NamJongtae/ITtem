import { usePathname } from "next/navigation";

interface IParams {
  pathnames: string[];
}

export default function useVisible({ pathnames }: IParams) {
  const pathname = usePathname();
  const isVisible = !pathnames.some((path) => pathname.includes(path));
  
  return { isVisible };
}
