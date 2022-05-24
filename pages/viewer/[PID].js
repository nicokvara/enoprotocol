import React, { useState, useEffect, useCallback } from "react";
import useSWR from "swr";
import axios from 'axios';
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Container } from "react-bootstrap";
import Navbar from "../../src/Components/Navbar";
import Meta from "../../src/Components/ArticleHeaders";
import PayWall from "../../src/Components/Viewer/PayWall";
import SignMsg from "../../src/Functions/SignMsg";
import { IsAuthorRequest } from '../../src/Components/Previewer/InformationContainer'
import { useRecoilState } from "recoil";

// Disabled SSR 𐂂
const Loader = dynamic(() => import("../../src/Components/Loader"), {
  ssr: false
});

function Viewer() {
  const router = useRouter();
  const { PID } = router.query;
  const [IsAuthor, setIsAuthor] = useRecoilState(IsAuthorRequest);
  const [Payer, setPayer] = useState(null);
  const [SignedAddress, setSignedAddress] = useState(null);
  const [PayData, setPayData] = useState(null)
  // const { data, error } = useSWR(
  //   `${process.env.NEXT_PUBLIC_API_URL}/articles/` + PID
  // );
  // const [data, setData] = useState(null);
  // const [error, setError] = useState(null);

  // const fetcher = params => url => axios.post(url, params)

  // const { data, error } = useSWR(
  //   `${process.env.NEXT_PUBLIC_API_URL}/articles/${PID}`,
  //   fetcher({consumer_pubkey: Payer, signed_article_address: SignedAddress})
  // );

  // Define who's paying 𐂂
  useEffect(() => {
    if (PID) {
      try {
        window.solana.connect();
        window.solana.on("connect", async () => {
          setPayer(window.solana.publicKey.toString());
          // if (IsAuthor) {
          //   const signAddress = await SignMsg(window.solana.publicKey.toString(), window.solana.signMessage, PID);
          //   setSignedAddress(signAddress);
          // }
        });
      } catch (error) {
        console.log(error);
      } 
    }
  }, [PID]);

  // useEffect(() => {
  //   if (Payer && SignedAddress && PID) {
  //     axios.post(`${process.env.NEXT_PUBLIC_API_URL}/articles/${PID}/`, {
  //       data: SignedAddress,
  //       _bn: window.solana.publicKey["_bn"],
  //     })
  //       .then(res => setData(res.data))
  //       .catch(err => setError(err))
  //   }
  // }, [Payer, SignedAddress, PID])

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
