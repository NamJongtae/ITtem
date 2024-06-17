import useSignoutMutate from "@/hooks/reactQuery/mutations/auth/useSignoutMutate";
import { RootState } from "@/store/store";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

interface IPrarms {
  toggleMenu: () => void;
}
export default function useNavMobileMenu({ toggleMenu }: IPrarms) {
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