import React, { useEffect, useState } from "react";
import Content from "./Content";
import Pay from "../../Functions/Pay";
import useSWR from "swr";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

// Disabled SSR 𐂂
const Loader = dynamic(() => import("../../../src/Components/Loader.jsx"), {
  ssr: false,
});

function PayWall() {
  const [Payer, setPayer] = useState(null);
  const [Paid, setPaid] = useState(false);

  const router = useRouter();
  const { PID } = router.query;

  const { data, error } = useSWR("https://api.cntn.xyz/articles/" + PID);

  // Define who's paying 𐂂
  useEffect(() => {
    try {
      window.solana.connect();
      window.solana.on("connect", () => {
        setPayer(window.solana.publicKey.toString());
      });
    } catch (error) {
      console.log(error);
    }
  }, [data]);

  // Pay function 𐂂
  useEffect(() => {
    //  if (typeof window === "undefined") {
    if (Payer !== null && data !== undefined) {
      Pay(
        data.metadata.article_author_address,
        data.metadata.article_price / 0.000000001
      ).then((response) => setPaid(response));
    }
    //  }
  }, [Payer, data]);

  useEffect(() => {
    console.log(Payer);
    console.log(data);
  }, [Payer, data]);

  if (error) return <div>failed to load</div>; // Page loading state 𐂂
  if (!data) return <Loader Title="Loading Viewer" Description="Please wait" />; // Page error state 𐂂

  return (
    <>
      {Paid !== false && <Content />}
      {Paid === false && (
        <Loader
          Title="Payment Authorization Requested"
          Description="Refresh the page to try again"
        />
      )}
    </>
  );
}

export default PayWall;
