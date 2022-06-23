import React, { useState, useEffect } from "react";
import { Row, Container } from "react-bootstrap";
import axios from 'axios';
import useSWR from "swr";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

// Components 𐂂
import InformationContainer from "../../src/Components/Previewer/InformationContainer";
import CardContainer from "../../src/Components/Previewer/CardContainer";
import Meta from "../../src/Components/ArticleHeaders";

// Disabled SSR 𐂂
const Loader = dynamic(() => import("../../src/Components/Loader"), {
  ssr: false
});
const WalletModal = dynamic(() => import("../../src/Components/Modal/Modal"), {
  ssr: false
});
const Header = dynamic(() => import("../../src/Components/Previewer/Header"), {
  ssr: false
});

function MintinInProgress() {
  const [InterfaceFee, setInterfaceFee] = useState(0);
  const [metadata, setMetadata] = useState();

  const router = useRouter();
  const { PID } = router.query;

  // Get the post using the ID 𐂂
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/articles/` + PID
  );

  useEffect(() => {
    if (PID) {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/mint_status/${PID}/`)
        .then(res => {
          console.log(res.data)
        })
        .catch(err => console.log(err))
    }
  }, [PID]);

  return (
    <>
      <Meta
        // title={data.metadata.article_title}
        // description={data.metadata.article_description}
        PID={PID}
        url={`${process.env.NEXT_PUBLIC_BASE_URL}/minting-in-progress/${PID}.png`}
      />
      <Container>
        <Header />
        <Row>
          <h1>Minting in progress...</h1>
        </Row>
      </Container>
    </>
  );
}

export default MintinInProgress;
