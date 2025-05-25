import { useRouter } from "next/navigation";

export default function useSignupCancelHandler() {
  const router = useRouter();

  const cancelSignup = () => {
    router.push("/");
  };

  return { cancelSignup };
}
