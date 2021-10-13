import React from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import { Container } from "react-bootstrap";
import Navbar from "../../src/Components/Navbar";
import Meta from "../../src/Components/ArticleHeaders";

import PayWall from "../../src/Components/Viewer/PayWall";

function Viewer() {
  const router = useRouter();
  const { PID } = router.query;

  // Get the post using the ID 𐂂
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/articles/` + PID
  );

  return (
    <>
      <Meta
        title={data.metadata.article_title}
        description={data.metadata.article_description}
        url={`${process.env.NEXT_PUBLIC_API_URL}/articles/` + PID}
      />
      <Container>
        <Navbar />
        <PayWall />
      </Container>
    </>
  );
}

export default Viewer;
