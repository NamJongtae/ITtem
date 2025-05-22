import SignupPage from '@/domains/auth/components/signup/signup-page';
import { BASE_URL } from "@/constants/constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(`${BASE_URL}/signup`),
  title: "ITtem | 회원가입",
  openGraph: {
    url: `${BASE_URL}/signup`,
    title: "ITtem | 회원가입"
  }
};

export default function Signup() {
  return <SignupPage />;
}
