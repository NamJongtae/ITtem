import { useSearchParams } from "next/navigation";

export function useGetQuerys(keys: string[] | string) {
  const searchParams = useSearchParams();
  const keyArray = Array.isArray(keys) ? keys : [keys];

  const result: Record<string, string> = {};

  keyArray.forEach((key) => {
    const value = searchParams.get(key);
    if (value !== null) {
      result[key] = value;
    }
  });

  return result;
}
