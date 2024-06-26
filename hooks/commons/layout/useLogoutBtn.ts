import useSignoutMutate from "@/hooks/reactQuery/mutations/auth/useSignoutMutate";

export default function useLogoutBtn() {
  const { signoutMutate } = useSignoutMutate();

  const handleClickLogout = () => {
    signoutMutate(undefined);
  };

  return { handleClickLogout };
}
