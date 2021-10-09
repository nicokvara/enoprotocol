import React from "react";
import styled from "styled-components";
import { Row, Container, Col, Button } from "react-bootstrap";
import Logo from "../../../public/Assets/Logo.svg";
import { motion } from "framer-motion";
import Image from "next/image";

// Styles  𐂂
const SCol = styled(Col)`
  height: 95vh;
  display: flex !important;
  justify-content: left !important;
  align-items: center !important;
  margin: 0px 24px 0px 24px !important;
`;
const SH1 = styled.h1`
  font-size: 1.8em !important;
  font-weight: 700 !important;
  margin-bottom: -12px;
  max-width: 75vw;
  margin: 24px 0px 12px 0px;
  display: block;
`;
const SDiv = styled.div`
  max-width: 70vw;
`;
const SButton = styled(Button)`
  display: block;

  font-size: 14px;
  padding: 6px 12px 6px 12px;
  margin: 24px 0px 0px 0px;
`;

function Homepage() {
  return (
    <>
      <Container>
        <Row>
          <SCol>
            <SDiv>
              <motion.div
                initial={{ opacity: 0, y: +30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  type: "spring",
                  ease: "circInOut"
                }}
                exit={{ opacity: 0 }}
              >
                <Image
                  alt="content.xyz Logo"
                  src={Logo}
                  width={31}
                  height={31}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: +30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  type: "spring",
                  ease: "circInOut"
                }}
                exit={{ opacity: 0 }}
              >
                <SH1>Create, own and monetize your content.</SH1>
                <p>
                  Eno.xyz is a censorship resistant interface for creating and
                  interacting with protected content powered by the distributed
                  ledger and cryptographic technologies. Eno.xyz doesn't collect
                  any data from users allowing them to stay fully anonymous if
                  they so desire. Currently only textual content is supported.
                </p>
                <SButton
                  variant="outline-dark"
                  onClick={() => {
                    window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/new`;
                  }}
                >
                  Create
                </SButton>
              </motion.div>
            </SDiv>
          </SCol>
        </Row>
      </Container>
    </>
  );
}

export default Homepage;
