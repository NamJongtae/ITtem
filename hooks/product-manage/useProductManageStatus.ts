import { ProductManageStaus } from "@/components/product-manage/product-manage-page";
import { toQueryStatus } from "@/lib/productStatusMapper";
import { useState } from "react";
import { useGetQuerys } from "../commons/useGetQuerys";
import { useCustomRouter } from "../commons/useCustomRouter";

interface IParams {
  initialManageStatus: ProductManageStaus;
}

export default function useProductManageStatus({
  initialManageStatus
}: IParams) {
  const [manageStatus, setManageStatus] =
    useState<ProductManageStaus>(initialManageStatus);
  const { search } = useGetQuerys("search");
  const { navigate } = useCustomRouter();

  const handleChangeManageStatus = (manageType: ProductManageStaus) => {
    setManageStatus(manageType);
    const status = toQueryStatus(manageType);

    const newUrl = `/product/manage${
      search ? `?search=${search}&status=${status}` : `?status=${status}`
    }`;
    navigate({ type: "push", url: newUrl });
  };

  return { manageStatus, handleChangeManageStatus };
}
