import React from "react";
import styled from "styled-components";
import { Row, Container, Col, Button } from "react-bootstrap";
import Logo from "../../../public/Assets/Logo.svg";
// import DiscordLogo from "../../../public/Assets/discordLogo.png";
import TwitterLogo from "../../../public/Assets/twitterLogo.png";
import DiscordLogo from "../../../public/Assets/discord.png";
import thumbnailImage from "../../../public/Assets/thumbnail.png";
import { motion } from "framer-motion";
import Image from "next/image";
import Head from "next/head";

// Styles  𐂂
const SCol = styled(Col)`
  height: 95vh;
  display: flex !important;
  justify-content: left !important;
  align-items: center !important;
  margin: 0px 24px 0px 24px !important;
`;
const SocialContainer = styled.div`
  display: flex;
  justify-content: center;
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
const SLink = styled.a`
  display: flex;
  justify-content: center;
  margin-right: 16px;
`;

function Homepage() {
  return (
    <>
      <Head>
        <link rel="canonical" href={process.env.NEXT_PUBLIC_BASE_URL} />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_BASE_URL} />
         <meta
          property="og:image"
          content={thumbnailImage}
        />
        <meta
          property="og:title"
          content="Eno - Create, own and monetize your content"
        />
        <meta
          name="description"
          content="Eno.xyz is a censorship resistant interface for creating and interacting with protected content powered by the distributed ledger and cryptographic technologies. Eno.xyz doesn't collect any data from users allowing them to stay fully anonymous if they so desire. Currently only textual content is supported."
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content={process.env.NEXT_PUBLIC_BASE_URL}
        />
        <meta
          property="twitter:title"
          content="Eno - Create, own and monetize your content"
        />
        <meta
          property="twitter:image"
          content={thumbnailImage}
        />
      </Head>
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
                <Image alt="eno.xyz Logo" src={Logo} width={116} height={31} />
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
                  ledger and cryptographic technologies. Eno.xyz doesn`t collect
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
        <SocialContainer>
          <SLink href="https://discord.com/invite/gQK6gxDQPS" target="_blank">
            <Image alt="eno.xyz Logo" src={DiscordLogo} width={25} height={21} />
          </SLink>
          <SLink href="https://twitter.com/enoprotocol" target="_blank">
            <Image alt="eno.xyz Logo" src={TwitterLogo} width={25} height={21} />
          </SLink>
        </SocialContainer>
      </Container>
    </>
  );
}

export default Homepage;
