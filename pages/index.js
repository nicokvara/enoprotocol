import Head from "next/head";
import HomeComponent from "../src/Components/Home/Homepage";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Pre-Alpha</title>
        <meta
          name="title"
          content="Eno - Create, own and monetize your content"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <meta
          name="description"
          content="Eno.xyz is a censorship resistant interface for creating and interacting with protected content powered by the distributed ledger and cryptographic technologies. Eno.xyz doesn't collect any data from users allowing them to stay fully anonymous if they so desire. Currently only textual content is supported."
        />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_BASE_URL} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_BASE_URL} />
        <meta
          property="og:title"
          content="Eno - Create, own and monetize your content"
        />
        <meta
          property="og:image"
          content={process.env.NEXT_PUBLIC_BASE_URL + "/Assets/Logo.svg"}
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content={process.env.NEXT_PUBLIC_BASE_URL}
        />
        <meta
          property="twitter:title"
          content="Eno - Create, own and monetize your content"
        />
        <meta
          property="twitter:image"
          content={process.env.NEXT_PUBLIC_BASE_URL + "/Assets/Logo.svg"}
        />
      </Head>
      <HomeComponent />
    </div>
  );
}
