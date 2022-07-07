import React from "react";
import { Row, Container, Col, Navbar, Button } from "react-bootstrap";
import Image from "next/image";
import Logo from "../../../public/Assets/Logo.svg";

const Header = () => (
  <Row>
    <Col>
      <Navbar bg="white">
        <Container>
          <Navbar.Brand href={process.env.NEXT_PUBLIC_BASE_URL}>
            <Image alt="eno.xyz Logo" src={Logo} width={142} height={35} />
          </Navbar.Brand>
        </Container>
      </Navbar>
    </Col>
  </Row>
);

export default Header;
