import { useCustomRouter } from "@/shared/common/hooks/useCustomRouter";

interface IParams {
  productId: string;
}

export default function useProductEditNavigation({ productId }: IParams) {
  const { navigate } = useCustomRouter();
  const goToProductEditPage = () => {
    navigate({ type: "push", url: `/product/${productId}/edit` });
  };

  return { goToProductEditPage };
}
