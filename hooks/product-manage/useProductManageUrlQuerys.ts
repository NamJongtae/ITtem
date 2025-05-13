import { ProductManageMenuType, ProductManageQueryStatusType } from '@/types/product-types';
import { useGetQuerys } from "../commons/useGetQuerys";

export default function useProductManageUrlQuerys() {
  const { menu, search, status } = useGetQuerys(["menu", "search", "status"]);
  return {
    menu: (menu ?? "판매") as ProductManageMenuType,
    status: (status ?? "TRADING") as ProductManageQueryStatusType,
    search
  };
}
