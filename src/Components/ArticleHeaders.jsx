import React from "react";
import Head from "next/head";

export default function ArticleHeaders(props) {
  return (
    <Head>
      <title>{props.title}</title>
      <link rel="canonical" href='https://www.eno.xyz/previewer/498162' />
      <meta property="og:type" content="article" />
      <meta property="og:url" content='https://www.eno.xyz/previewer/498162' />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta
        property="og:image"
        content="https://api.eno.xyz/link_preview_data/606319.png"
      />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={props.url} />
      <meta property="twitter:title" content={props.title} />
      <meta
        property="twitter:image"
        content={process.env.NEXT_PUBLIC_BASE_URL + "/Assets/Logo.svg"}
      />
    </Head>
  );
}
