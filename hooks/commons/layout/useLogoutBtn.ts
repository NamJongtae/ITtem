import useSignoutMutate from "@/hooks/react-query/mutations/auth/useSignoutMutate";
import useAuthStore from "@/store/auth-store";

export default function useLogoutBtn() {
  const { signoutMutate } = useSignoutMutate();
  const { actions } = useAuthStore((state) => state);
  const handleClickLogout = () => {
    actions.setIsLoading(true);
    signoutMutate();
  };

  return { handleClickLogout };
}
