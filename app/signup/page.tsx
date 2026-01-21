import SignupScreen from "@/domains/auth/signup/components/SignupScreen";
import { BASE_URL } from "@/shared/common/constants/constant";
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
  return <SignupScreen />;
}
