import useSignoutMutate from "@/hooks/react-query/mutations/auth/useSignoutMutate";
import useAuthStore from '@/store/auth-store';
import { useRouter } from "next/navigation";

interface IParams {
  toggleMenu: () => void;
}
export default function useNavMobileMenu({ toggleMenu }: IParams) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
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
