import { Html, Head, Main, NextScript, DocumentProps } from "next/document";

// Korean pages live under /ko, so the document language follows the path
export default function Document(props: DocumentProps) {
  const page = props.__NEXT_DATA__.page;
  const lang = page.startsWith("/ko") ? "ko" : "en";
  // Tiny Us pages carry the Tiny Us app icon
  const tiny = /^(\/ko)?\/tinyus(\/|$)/.test(page);
  return (
    <Html lang={lang}>
      <Head>
        <link rel="icon" href={tiny ? "/tinyus/brand/favicon.png" : "/favicon.png?v=2"} />
        <link rel="apple-touch-icon" href={tiny ? "/tinyus/brand/apple-touch-icon.png" : "/apple-touch-icon.png?v=2"} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
