import { usePathname } from "next/navigation";

export default function useNavSell() {
  const pathname = usePathname();

  return { pathname };
}
