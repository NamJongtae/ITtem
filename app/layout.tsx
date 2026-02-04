import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "react-toastify/dist/ReactToastify.min.css";
import "@/shared/common/styles/toast.css";
import "@/shared/common/styles/swiperStyles.css";
import "@/shared/common/styles/globals.css";
import Layout from "@/shared/layout/components/Layout";
import { ToastContainer } from "react-toastify";
import { BASE_URL } from "@/shared/common/constants/constant";
import ReactQueryProvider from "@/shared/common/store/ReactQueryProvider";
import GlobalLoading from "@/shared/common/components/GlobalLoading";
import { BASE_METADATA } from "@/domains/auth/shared/common/constants/constansts";

const inter = Noto_Sans_KR({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"]
});

export const metadata = BASE_METADATA;

export default function RootLayout({
  children,
  signin
}: Readonly<{
  children: React.ReactNode;
  signin: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <ReactQueryProvider>
          <GlobalLoading />
          <Layout>
            {signin}
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
        </ReactQueryProvider>
        <div id="portal-root"></div>
      </body>
    </html>
  );
}
