import {
  ProductManageMenuType,
  ProductManageQueryStatusType
} from "../types/productManageTypes";
import { useGetQuerys } from "@/shared/common/hooks/useGetQuerys";

export default function useProductManageUrlQuerys() {
  const { menu, search, status } = useGetQuerys(["menu", "search", "status"]);
  const isValidMenu = menu === "sale" || menu === "purchase";
  const isValidStatus =
    status === "TRADING" ||
    status === "TRADING_END" ||
    status === "CANCEL_END/RETURN_END" ||
    status === "CANCEL_REJECT/RETURN_REJECT";

  const validatedMenu: ProductManageMenuType = isValidMenu ? menu : "sale";
  const validatedStatus: ProductManageQueryStatusType = isValidStatus
    ? status
    : "TRADING";

  return {
    menu: validatedMenu,
    status: validatedStatus,
    search
  };
}
