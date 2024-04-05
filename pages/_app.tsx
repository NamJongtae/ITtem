import "@/styles/globals.css";
import "swiper/css";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/toast.css";
import type { AppProps } from "next/app";
import { Noto_Sans_KR } from "next/font/google";
import StoreProvider from "@/store/StoreProvider";
import ReactQueryProvider from "@/store/ReactQueryProvider";

const inter = Noto_Sans_KR({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <ReactQueryProvider>
        <main className={inter.className}>
          <Component {...pageProps} />
        </main>
      </ReactQueryProvider>
    </StoreProvider>
  );
}
