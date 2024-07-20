import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/toast.css";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/swiperStyles.css";
import ReactQueryProvider from "@/store/ReactQueryProvider";
import ReduxProvider from "@/store/ReduxProvider";
import Layout from "@/components/commons/layout/layout";
import { ToastContainer } from "react-toastify";
import { Suspense } from "react";
import Loading from "@/app/loading";
import { BASE_URL } from "@/constants/constant";

const inter = Noto_Sans_KR({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ITtem",
  metadataBase: new URL(BASE_URL),
  description:
    "중고거래 플랫폼, 잇템. 안전하고 쉬운 중고거래, 다양한 상품과 빠른 거래를 경험하세요.",
  verification: {
    google: "c6hLQ83ILZIlJb0fwdyrw71DGHnTFaI7hmmORy7fpk0",
    other: {
      "naver-site-verification": "8a189164663805b9eeea137c43336f57fa7bdcf2",
    },
  },
  icons: {
    icon: "/icons/logo.svg",
  },
  openGraph: {
    url: BASE_URL,
    title: "ITtem",
    description:
      "중고거래 플랫폼, 잇템. 안전하고 쉬운 중고거래, 다양한 상품과 빠른 거래를 경험하세요.",
    images: {
      url: "/images/og_img.png",
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <ReduxProvider>
          <ReactQueryProvider>
            <Suspense fallback={<Loading />}>
              <Layout>
                <main className={"flex-grow mt-[113px] md:mt-[127px]"}>
                  {children}
                </main>
                <ToastContainer
                  position="top-center"
                  limit={1}
                  closeOnClick={true}
                  closeButton={true}
                  pauseOnHover={false}
                  draggable={true}
                  autoClose={2000}
                  pauseOnFocusLoss={false}
                  theme="light"
                  hideProgressBar={true}
                />
              </Layout>
            </Suspense>
          </ReactQueryProvider>
        </ReduxProvider>
        <div id="portal-root"></div>
      </body>
    </html>
  );
}
