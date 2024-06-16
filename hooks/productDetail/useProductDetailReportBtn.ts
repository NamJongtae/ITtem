import { toast } from "react-toastify";
import useProductReportMutate from "../reactQuery/mutations/product/useProductReportMutate";
import useMyProfileQuery from "../reactQuery/querys/profile/useMyProfileQuery";

interface IPrarms {
  reportUserIds: string[] | undefined;
}

export default function useProductDetailReportBtn({ reportUserIds }: IPrarms) {
  const { productReportMutate } = useProductReportMutate();
  const { myProfileData, loadMyProfileLoading } = useMyProfileQuery();
  const isReport = reportUserIds?.includes(myProfileData?.uid || "");

  const handleClickReport = () => {
    if (!myProfileData) {
      toast.warn("로그인 후 이용해주세요.");
      return;
    }
    if (isReport) {
      toast.warn("이미 신고한 상품이에요.");
    } else {
      productReportMutate(undefined);
    }
  };

  return { loadMyProfileLoading, myProfileData, handleClickReport };
}
