import { useRouter } from "next/navigation";

export default function useRouterBackToCloseModal() {
  const router = useRouter();
  const closeModalHandler = () => {
    router.back();
  };

  return { closeModalHandler };
}
