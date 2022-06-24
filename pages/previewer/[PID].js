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

function Previewer() {
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
      // ???
      axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/link_previews/${PID}`)
        .then(res => {
          console.log(res.data)
        })
        .catch(err => console.log(err))
    }
  }, [PID]);

  return (
    <>
      {error && <div>failed to load</div>}
      {!data && <Loader Title="Loading Previewer" Description="Please wait" />}
      {data && (
        <>
          <WalletModal />
          <Meta
            title={data.metadata.article_title}
            description={data.metadata.article_description}
            PID={PID}
            url={`${process.env.NEXT_PUBLIC_BASE_URL}/link_preview_data/${PID}.png`}
          />
          <Container>
            <Header />
            <Row>
              <CardContainer
                Title={data.metadata.article_title}
                Description={data.metadata.article_description}
              />
              <InformationContainer
                PID={PID}
                OwnerFee={data.metadata.article_price}
                InterfaceFee={InterfaceFee}
                TotalFee={data.metadata.article_price + InterfaceFee}
              />
            </Row>
          </Container>
        </>
      )}
    </>
  );
}

export default Previewer;
