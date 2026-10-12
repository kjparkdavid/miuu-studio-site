import { Html, Head, Main, NextScript, DocumentProps } from "next/document";

// Korean pages live under /ko, so the document language follows the path
export default function Document(props: DocumentProps) {
  const lang = props.__NEXT_DATA__.page.startsWith("/ko") ? "ko" : "en";
  return (
    <Html lang={lang}>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
