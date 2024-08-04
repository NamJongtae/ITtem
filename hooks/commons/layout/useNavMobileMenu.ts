import useSignoutMutate from "@/hooks/react-query/mutations/auth/useSignoutMutate";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

interface IParams {
  toggleMenu: () => void;
}
export default function useNavMobileMenu({ toggleMenu }: IParams) {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const { signoutMutate } = useSignoutMutate();

  const handleClicksignin = () => {
    router.push("/signin");
    toggleMenu();
  };

  const handleClickSignout = () => {
    signoutMutate(undefined);
    toggleMenu();
  };

  return { user, handleClicksignin, handleClickSignout };
}
