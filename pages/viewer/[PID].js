import React from "react";
import { Container } from "react-bootstrap";
import Navbar from "../../src/Components/Navbar";

import PayWall from "../../src/Components/Viewer/PayWall";

function Viewer() {
  return (
    <>
      <Container>
        <Navbar />
        <PayWall />
      </Container>
    </>
  );
}

export default Viewer;
