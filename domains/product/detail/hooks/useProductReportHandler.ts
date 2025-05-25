import { toast } from "react-toastify";
import useProductReportMutate from "./mutations/useProductReportMutate";
import useMyProfileQuery from "@/domains/user/profile/hooks/queries/useMyProfileQuery";

interface IParams {
  reportUserIds: string[] | undefined;
}

export default function useProductReportHandler({ reportUserIds }: IParams) {
  const { productReportMutate } = useProductReportMutate();
  const { myProfileData, myProfilePending } = useMyProfileQuery();
  const isReport = reportUserIds?.includes(myProfileData?.uid || "");

  const handleClickReport = () => {
    if (!myProfileData) {
      toast.warn("로그인 후 이용해주세요.");
      return;
    }
    if (isReport) {
      toast.warn("이미 신고한 상품이에요.");
    } else {
      const isReport = confirm("정말 신고하겠습니까?");
      if (isReport) {
        productReportMutate(undefined);
      }
    }
  };

  return { myProfilePending, myProfileData, handleClickReport };
}
