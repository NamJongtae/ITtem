import { toast } from "react-toastify";
import useProductReportMutate from "./mutations/useProductReportMutate";
import useMyProfileQuery from "@/domains/user/profile/hooks/queries/useMyProfileQuery";

interface IParams {
  isReported: boolean | undefined;
}

export default function useProductReportHandler({ isReported }: IParams) {
  const { productReportMutate } = useProductReportMutate();
  const { myProfileData, myProfilePending } = useMyProfileQuery();

  const handleClickReport = () => {
    if (!myProfileData) {
      toast.warn("로그인 후 이용해주세요.");
      return;
    }
    if (isReported) {
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
