import { ProductManageMenuType } from "../../types/product-types";
import { useCustomRouter } from "../../../../hooks/useCustomRouter";
import useProductManageUrlQuerys from "./useProductManageUrlQuerys";

export default function useProductMenu() {
  const { menu, search, status } = useProductManageUrlQuerys();

  const { navigate } = useCustomRouter();
  const handleChangeMenu = (menu: ProductManageMenuType) => {
    const newUrl = `/product/manage${
      search
        ? `?menu=${menu}&search=${search}&status=${status}`
        : `?menu=${menu}&status=${status}`
    }`;

    navigate({ type: "push", url: newUrl });
  };

  return { menu, handleChangeMenu };
}
