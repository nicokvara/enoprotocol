import React from "react";
import Head from "next/head";

export default function ArticleHeaders(props) {
  return (
    <Head>
      <title>{props.title}</title>
      <link rel="canonical" href={props.url} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={props.url} />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta
        property="og:image"
        content={`https://api.eno.xyz/link_preview_data/${props.PID}.png`}
      />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={props.url} />
      <meta property="twitter:title" content={props.title} />
      <meta
        property="twitter:image"
        content={`https://api.eno.xyz/link_preview_data/${props.PID}.png`}
      />
    </Head>
  );
}
