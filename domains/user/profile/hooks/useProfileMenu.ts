import { useRouter, useSearchParams } from "next/navigation";
import { ProfileMenu } from "../types/profileTypes";

export default function useProfileMenu() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentMenu = (searchParams?.get("m") ?? "products") as ProfileMenu;

  const onClickMenu = (menu: ProfileMenu) => {
    router.push(`/profile?m=${menu}`);
  };

  return { currentMenu, onClickMenu };
}
