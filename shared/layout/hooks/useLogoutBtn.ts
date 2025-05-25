import useSignoutMutate from "@/domains/auth/signout/hooks/useSignoutMutate";

export default function useLogoutBtn() {
  const { signoutMutate } = useSignoutMutate();
  const handleClickLogout = () => {
    signoutMutate();
  };

  return { handleClickLogout };
}
