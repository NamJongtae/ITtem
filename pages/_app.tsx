import "@/styles/global.css";
import "swiper/css";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/toast.css";
import type { AppProps } from "next/app";
import { Noto_Sans_KR } from "next/font/google";
import StoreProvider from "@/store/StoreProvider";
import ReactQueryProvider from "@/store/ReactQueryProvider";
import Layout from "@/components/commons/layout/layout";
import { ToastContainer } from "react-toastify";
import { usePathname } from "next/navigation";

const inter = Noto_Sans_KR({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  const pathanme = usePathname();

  return (
    <StoreProvider>
      <ReactQueryProvider>
        <style jsx global>{`
          html {
            font-family: ${inter.style.fontFamily};
          }
          #__next {
            @apply ${!pathanme.includes("/signup") || !pathanme.includes
            ("/signin") && "pb-16 md:pb-0"}
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
      </ReactQueryProvider>
    </StoreProvider>
  );
}
