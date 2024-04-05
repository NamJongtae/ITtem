import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className={"flex flex-col min-h-screen pb-16 md:pb-0"}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
