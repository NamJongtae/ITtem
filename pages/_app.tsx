import "@/styles/global.css";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/swiperStyles.css";
import "@/styles/toast.css";
import type { AppProps } from "next/app";
import { Noto_Sans_KR } from "next/font/google";
import ReactQueryProvider from "@/store/ReactQueryProvider";
import Layout from "@/components/commons/layout/layout";
import { ToastContainer } from "react-toastify";
import { HydrationBoundary } from "@tanstack/react-query";
import wrapper from "@/store/store";
import Script from "next/script";
import { Provider } from "react-redux";
import MetaHead from "@/components/metaHead/meta-head";

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

function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <MetaHead />
      <ReactQueryProvider>
        <HydrationBoundary state={props.pageProps.dehydratedState}>
          <style jsx global>{`
            html {
              font-family: ${inter.style.fontFamily};
            }
          `}</style>
          <Layout>
            <main className={"flex-grow mt-[113px] md:mt-[127px]"}>
              <Component {...props.pageProps} />
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
    </Provider>
  );
}

export default App;
