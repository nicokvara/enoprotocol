import React from "react";
import { Row, Container, Col, Navbar } from "react-bootstrap";
import Logo from "../../public/Assets/Logo.svg";
import Image from "next/image";

// CNvabat - Custom Navbar 𐂂
function CNavbar() {
  return (
    <Row>
      <Col>
        <Navbar bg="white">
          <Container>
            <Navbar.Brand href={process.env.NEXT_PUBLIC_BASE_URL}>
              <Image alt="content.xyz Logo" src={Logo} width={80} height={31} />
            </Navbar.Brand>
          </Container>
        </Navbar>
      </Col>
    </Row>
  );
}

export default CNavbar;
