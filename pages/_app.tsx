import "@/styles/global.css";
import "swiper/css";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/toast.css";
import type { AppProps } from "next/app";
import { Noto_Sans_KR } from "next/font/google";
import ReactQueryProvider from "@/store/ReactQueryProvider";
import Layout from "@/components/commons/layout/layout";
import { ToastContainer } from "react-toastify";
import { usePathname } from "next/navigation";
import Head from "next/head";
import {
  HydrationBoundary,
} from "@tanstack/react-query";
import wrapper from "@/store/store";


const inter = Noto_Sans_KR({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

function App({ Component, pageProps }: AppProps) {
  const pathanme = usePathname();

  return (
    <>
      <Head>
        <meta
          name="description"
          content="중고거래 플랫폼, 잇템. 안전하고 쉬운 중고거래, 다양한 상품과 빠른 거래를 경험하세요."
          key="desc"
        />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1"
        />
        <link rel="icon" href="/icons/logo.svg" />
      </Head>
      <ReactQueryProvider>
        <HydrationBoundary state={pageProps.dehydratedState}>
          <style jsx global>{`
            html {
              font-family: ${inter.style.fontFamily};
            }
            #__next {
              @apply ${!pathanme.includes("/signup") ||
              (!pathanme.includes("/signin") && "pb-16 md:pb-0")};
            }
          `}</style>
          <Layout>
            <main className={"flex-grow mt-[113px] md:mt-[127px]"}>
              <Component {...pageProps} />
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
        </HydrationBoundary>
      </ReactQueryProvider>
    </>
  );
}

export default wrapper.withRedux(App);
