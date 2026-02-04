import { BASE_URL } from "@/shared/common/constants/constant";
import { Metadata } from "next";
import ResetPasswordPage from "@/domains/auth/reset-password/components/ResetPasswordPage";
import { BASE_METADATA } from "@/domains/auth/shared/common/constants/constansts";

export const metadata: Metadata = {
  ...BASE_METADATA,
  metadataBase: new URL(`${BASE_URL}/find-password`),
  title: "ITtem | 비밀번호찾기",
  openGraph: {
    ...BASE_METADATA.openGraph,
    url: `${BASE_URL}/find-password`,
    title: "ITtem | 비밀번호찾기"
  }
};

export default function FindPassword() {
  return <ResetPasswordPage />;
}
