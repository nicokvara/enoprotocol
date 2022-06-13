import React, { useState, useEffect } from "react";
import axios from 'axios';
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Container } from "react-bootstrap";
import Navbar from "../../src/Components/Navbar";
import Meta from "../../src/Components/ArticleHeaders";
import PayWall from "../../src/Components/Viewer/PayWall";

// Disabled SSR 𐂂
const Loader = dynamic(() => import("../../src/Components/Loader"), {
  ssr: false
});

function Viewer() {
  const router = useRouter();
  const { PID } = router.query;
  const [Payer, setPayer] = useState(null);
  const [SignedAddress, setSignedAddress] = useState(null);
  const [PayData, setPayData] = useState(null)

  // Define who's paying 𐂂
  useEffect(async () => {
    if (PID) {
      try {
        const resp = await window.solana.connect();
        setPayer(resp.publicKey.toString())
      } catch (error) {
        console.log(error);
      } 
    }
  }, [PID]);

  useEffect(() => {
    if (Payer && PID) {
      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/consume_article/${PID}/`, {
        consumer_key: window.solana.publicKey["_bn"]
      })
        .then(res => setPayData(res.data))
        .catch(err => console.log(err))
    }
  }, [Payer, SignedAddress, PID])

  return (
    <>
      {!PayData && <Loader Title="Loading Viewer" Description="Please wait" />}
      {PayData && (
        <>
          <Meta
            // title={data.metadata.article_title}
            // description={data.metadata.article_description}
            PID={PID}
            url={`${process.env.NEXT_PUBLIC_BASE_URL}/viewer/` + PID}
          />
          <Container>
            <Navbar />
            <PayWall
              payData={PayData}
              Payer={Payer}
              SignedAddress={SignedAddress}
              depositStatusLink={PayData && PayData.cost_deposit_status}
            />
          </Container>
        </>
      )}
    </>
  );
}

export default Viewer;
