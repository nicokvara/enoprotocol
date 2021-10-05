import React from "react";
import Head from "next/head";

export default function ArticleHeaders(props) {
  return (
    <Head>
      <title>{props.title}</title>
      <meta name="twitter:card" content="summary" />
      <meta property="og:url" content={props.url} />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      {/*  <meta
        property="og:image"
        content="http://graphics8.nytimes.com/images/2011/12/08/technology/bits-newtwitter/bits-newtwitter-tmagArticle.jpg"
    /> */}
    </Head>
  );
}
