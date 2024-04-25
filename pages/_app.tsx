import "@/styles/global.css";
import "swiper/css";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/toast.css";
import type { AppProps } from "next/app";
import { Noto_Sans_KR } from "next/font/google";
import ReactQueryProvider from "@/store/ReactQueryProvider";
import Layout from "@/components/commons/layout/layout";
import { ToastContainer } from "react-toastify";
import Head from "next/head";
import { HydrationBoundary } from "@tanstack/react-query";
import wrapper from "@/store/store";
import Script from "next/script"; 

const inter = Noto_Sans_KR({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

declare global {
  interface Window {
    Kakao: any;
  }
}

function kakaoInit() {
  window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
}

function App({ Component, pageProps }: AppProps) {

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
          `}</style>
          <Layout>
            <main className={"flex-grow mt-[113px] md:mt-[127px]"}>
              <Component {...pageProps} />
              <Script
                src="https://developers.kakao.com/sdk/js/kakao.js"
                onLoad={kakaoInit}
              ></Script>
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
