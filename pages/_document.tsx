import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head title="아이템을-잇다 잇템.">
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
      <body>
        <Main />
        <div id="portal-root"></div>
        <NextScript />
      </body>
    </Html>
  );
}
