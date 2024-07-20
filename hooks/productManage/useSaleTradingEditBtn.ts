import { useRouter } from "next/navigation";

interface IParams {
  productId: string;
}

export default function useSaleTradingEditBtn({ productId }: IParams) {
  const router = useRouter();
  const handleClickEdit = () => {
    router.push(`/product/${productId}/edit`);
  };

  return { handleClickEdit };
}
