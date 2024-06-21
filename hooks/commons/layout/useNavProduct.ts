import { usePathname } from "next/navigation";

export default function useNavProduct() {
  const pathname = usePathname();


  return { pathname };
}
