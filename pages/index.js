import Head from "next/head";
import HomeComponent from "../src/Components/Home/Homepage";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Pre-Alpha</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <meta
          name="description"
          content="Eno.xyz is a censorship resistant interface for creating and interacting with protected content powered by the distributed ledger and cryptographic technologies. Eno.xyz doesn't collect any data from users allowing them to stay fully anonymous if they so desire. Currently only textual content is supported."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeComponent />
    </div>
  );
}
