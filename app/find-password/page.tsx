import { BASE_URL } from "@/shared/common/constants/constant";
import { Metadata } from "next";
import ResetPasswordPage from "@/domains/auth/reset-password/components/ResetPasswordPage";

export const metadata: Metadata = {
  metadataBase: new URL(`${BASE_URL}/find-password`),
  title: "ITtem | 비밀번호찾기",
  openGraph: {
    url: `${BASE_URL}/find-password`,
    title: "ITtem | 비밀번호찾기"
  }
};

export default function FindPassword() {
  return <ResetPasswordPage />;
}
