import useSignoutMutate from "@/hooks/react-query/mutations/auth/useSignoutMutate";

export default function useLogoutBtn() {
  const { signoutMutate } = useSignoutMutate();
  const handleClickLogout = () => {
    signoutMutate();
  };

  return { handleClickLogout };
}
