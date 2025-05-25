import SigninPage from "@/domains/auth/signin/components/SigninPage";
import { BASE_URL } from "@/shared/common/constants/constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(`${BASE_URL}/signin`),
  title: "ITtem | 로그인",
  openGraph: {
    url: `${BASE_URL}/signin`,
    title: "ITtem | 로그인"
  }
};

export default function Signin() {
  return <SigninPage />;
}
