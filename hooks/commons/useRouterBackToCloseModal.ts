import { useRouter } from "next/router";

export default function useRouterBackToCloseModal() {
  const router = useRouter();
  const closeModalHandler = () => {
    router.back();
  };

  return { closeModalHandler };
}
