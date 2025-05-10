import { ProductManageStaus } from "@/components/product-manage/product-manage-page";
import { useState } from "react";
import { useGetQuerys } from "../commons/useGetQuerys";
import { useCustomRouter } from "../commons/useCustomRouter";

interface IParams {
  initialProductManageStatus: ProductManageStaus;
}

export default function useProductManageStatus({
  initialProductManageStatus
}: IParams) {
  const [manageStatus, setManageStatus] = useState<ProductManageStaus>(
    initialProductManageStatus
  );
  const { search } = useGetQuerys("search");
  const { navigate } = useCustomRouter();

  const toQueryStatus = (manageStatus: ProductManageStaus) => {
    switch (manageStatus) {
      case "취소/반품 내역":
        return "CANCEL_END/RETURN_END";
      case "거래완료 내역":
        return "TRADING_END";
      case "취소/반품 거절 내역":
        return "CANCEL_REJECT/RETURN_REJECT";
      default:
        return "TRADING";
    }
  };

  const handleChangeManageStatus = (manageStatus: ProductManageStaus) => {
    setManageStatus(manageStatus);
    const status = toQueryStatus(manageStatus);

    const newUrl = `/product/manage${
      search ? `?search=${search}&status=${status}` : `?status=${status}`
    }`;
    navigate({ type: "push", url: newUrl });
  };

  return { manageStatus, handleChangeManageStatus };
}
