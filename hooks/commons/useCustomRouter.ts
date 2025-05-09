import { useRouter } from "next/navigation";

type RouterAction =
  | {
      type: "push";
      url: string;
      options?: { scroll?: boolean; shallow?: boolean };
    }
  | {
      type: "replace";
      url: string;
      options?: { scroll?: boolean; shallow?: boolean };
    }
  | { type: "refresh" }
  | { type: "back" };

export function useCustomRouter() {
  const router = useRouter();

  const navigate = (action: RouterAction) => {
    switch (action.type) {
      case "push":
        router.push(action.url, action.options);
        break;
      case "replace":
        router.replace(action.url, action.options);
        break;
      case "refresh":
        router.refresh();
        break;
      case "back":
        router.back();
        break;
      default:
        throw new Error("Unhandled action");
    }
  };

  return { navigate };
}
