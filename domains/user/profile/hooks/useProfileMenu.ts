import { useParams, useRouter, useSearchParams } from "next/navigation";
import { ProfileMenu } from "../types/profileTypes";

export default function useProfileMenu() {
  const router = useRouter();
  const { uid } = useParams();
  const searchParams = useSearchParams();
  const currentMenu = (searchParams?.get("m") ?? "products") as ProfileMenu;

  const onClickMenu = (menu: ProfileMenu) => {
    const basePath = uid ? `/profile/${uid}` : "/profile";
    router.push(`${basePath}?m=${menu}`);
  };

  return { currentMenu, onClickMenu };
}
