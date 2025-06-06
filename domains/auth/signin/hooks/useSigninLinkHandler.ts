import { useRouter } from "next/navigation";

export default function useSigninLinkHandler() {
  const router = useRouter();

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    location: string
  ) => {
    e.preventDefault();
    router.back();
    setTimeout(() => {
      router.push(location);
    }, 100);
  };

  return { handleLinkClick };
}
