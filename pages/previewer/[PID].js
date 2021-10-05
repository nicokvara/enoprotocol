import React, { useState, useEffect } from "react";
import { Row, Container } from "react-bootstrap";
import useSWR from "swr";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Meta from "../../src/Components/ArticleHeaders";

// Disabled SSR 𐂂
const Loader = dynamic(() => import("../../src/Components/Loader"), {
  ssr: false,
});

// Custom Functions 𐂂
// import GetPID from "../../src/Functions/GetPID";

// Components 𐂂
import InformationContainer from "../../src/Components/Previewer/InformationContainer";
import CardContainer from "../../src/Components/Previewer/CardContainer";

function Previewer() {
  const [InterfaceFee, setInterfaceFee] = useState(0);

  const router = useRouter();
  const { PID } = router.query;
  console.log('DEBUG', PID, router);
  
  // Get the post using the ID 𐂂

  const { data, error } = useSWR("https://api.cntn.xyz/articles/" + PID);

  return (
    <>
      {error && <div>failed to load</div>}
      {!data && <Loader Title="Loading Previewer" Description="Please wait" />}
      {data && (
        <>
          <Meta
            title={data.metadata.article_title}
            description={data.metadata.article_description}
            url={"https://api.cntn.xyz/articles/" + PID}
          />
          <Container>
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
