import FindPasswordPage from "@/components/find-password/find-password-page";
import { BASE_URL } from "@/constants/constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(`${BASE_URL}/findpassword`),
  title: "ITtem | 비밀번호찾기",
  openGraph: {
    url: `${BASE_URL}/findpassword`,
    title: "ITtem | 비밀번호찾기",
  },
};

export default function FindPassword() {
  return <FindPasswordPage />;
}
