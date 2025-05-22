import { useRouter } from "next/navigation";

export default function useGoogleLogin() {
  const router = useRouter();

  const googleLogin = () => {
    router.push(`https://accounts.google.com/o/oauth2/v2/auth?
		client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
		&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}
		&response_type=code
		&scope=email profile&prompt=login`);
  };

  return { googleLogin };
}
