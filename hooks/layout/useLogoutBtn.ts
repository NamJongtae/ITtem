import useSignoutMutate from '@/domains/auth/hooks/signout/useSignoutMutate';

export default function useLogoutBtn() {
  const { signoutMutate } = useSignoutMutate();
  const handleClickLogout = () => {
    signoutMutate();
  };

  return { handleClickLogout };
}
