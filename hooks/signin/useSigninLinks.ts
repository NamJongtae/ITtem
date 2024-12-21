import { useRouter } from "next/navigation";

export default function useSigninLinks() {
  const router = useRouter();
  const handleBackClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    location: string
  ) => {
    e.preventDefault();
    router.back();
    setTimeout(() => {
      router.push(location);
    }, 100);
  };
  return { handleBackClick };
}
