import { useCustomRouter } from "@/shared/common/hooks/useCustomRouter";
import {
  productStatusEncoder,
  productStatusParser
} from "../utils/productManageStatusMapper";
import useProductManageUrlQuerys from "./useProductManageUrlQuerys";
import { ProductManageStatusType } from "../types/productManageTypes";

export default function useProductManageStatus() {
  const { menu, search, status } = useProductManageUrlQuerys();
  const { navigate } = useCustomRouter();

  const handleChangeManageStatus = (manageStatus: ProductManageStatusType) => {
    const queryStatus = productStatusEncoder[manageStatus];

    const newUrl = `/product/manage${
      search
        ? `?menu=${menu}&search=${search}&status=${status}`
        : `?menu=${menu}&status=${queryStatus}`
    }`;
    navigate({ type: "push", url: newUrl });
  };

  return {
    productManageStatus: productStatusParser[status],
    handleChangeManageStatus
  };
}
