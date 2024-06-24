import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <link rel="icon" href="/icons/logo.svg" />
      </Head>
      <body>
        <Main />
        <div id="portal-root"></div>
        <NextScript />
      </body>
    </Html>
  );
}
