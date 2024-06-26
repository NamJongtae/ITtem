import { useRouter } from "next/router";

interface IPrarms {
  productId: string;
}

export default function useSaleTradingEditBtn({ productId }: IPrarms) {
  const router = useRouter();
  const handleClickEdit = () => {
    router.push(`/product/${productId}/edit`);
  };

  return { handleClickEdit };
}
