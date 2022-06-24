import React, { useState, useEffect } from "react";
import styled from "styled-components"
import { Row, Container } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import axios from 'axios';
import useSWR from "swr";
import { Col } from "react-bootstrap";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

// Components 𐂂
import Meta from "../../src/Components/ArticleHeaders";
import CardContainer from "../../src/Components/Previewer/CardContainer";

// Disabled SSR 𐂂
const Header = dynamic(() => import("../../src/Components/Previewer/Header"), {
  ssr: false
});

const Loader = dynamic(() => import("../../src/Components/Loader"), {
  ssr: false
});

// Styles  𐂂
const SCol = styled(Col)`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RSContainer = styled.div`
  // Right Side Container. Right side includes Description, Pricing and the Button.
  margin: 0px 27px 0px 27px;
  max-width: 490px;
`;

const LoaderBlock = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgb(0 0 0 / 10%), 0 3px 3px rgb(0 0 0 / 5%);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`;

const Load = styled.div`
  min-width: 12px;
  min-height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: #e0e0e0;
  border-right-color: #616161;
  animation: go1268368563 1s linear infinite;
  margin-right: 10px;
`;

const Error = styled.div `
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: #ff4b4b;
  position: relative;
  transform: rotate(45deg);
  animation: go2264125279 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  animation-delay: 100ms;
  margin-right: 10px;
  &:before {
    content: '';
    animation: go463499852 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: #fff;
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }
  &:after {
    content: '';
    animation: go3020080000 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: #fff;
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }
`;

const Success = styled.div`
  min-width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: #61d345;
  position: relative;
  transform: rotate(45deg);
  animation: go1310225428 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)forwards;
  animation-delay: 100ms;
  margin-right: 10px;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: go651618207 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: #fff;
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`;

function MintinInProgress() {
  const [mintStatus, setMintStatus] = useState(0);
  const router = useRouter();
  const { PID } = router.query;

  // Get the post using the ID 𐂂
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/articles/` + PID
  );

  useEffect(() => {
    if (PID) {
      const checkMintStatusLoop = setInterval(() => {
        if (mintStatus !== 2) {
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/mint_status/${PID}/`)
            .then(res => {
              setMintStatus(res.data.mint_status)
              if (res.data.mint_status === 2) {
                clearInterval(checkMintStatusLoop)
              }
            })
            .catch(err => console.log(err))
        }
      }, 3000)

      return  () => clearInterval(checkMintStatusLoop);
    }
  }, [PID]);

  useEffect(() => {
    if (mintStatus === 3) {
      setTimeout(router.push("/new/"), 4000)
    } else if (mintStatus === 2) {
      setTimeout(router.push("/previewer/" + PID), 4000)

    }
  }, [mintStatus])

  return (
    <>
      {error && <div>failed to load</div>}
      {!data && <Loader Title="Loading minting status" Description="Please wait" />}
      {data && (
        <>
          <Meta
            title={data.metadata.article_title}
            description={data.metadata.article_description}
            PID={PID}
            url={`${process.env.NEXT_PUBLIC_BASE_URL}/minting-in-progress/${PID}.png`}
          />
          <Container>
            <Header />
            <Row>
            <CardContainer
                Title={data.metadata.article_title}
                Description={data.metadata.article_description}
              />
            <SCol md={"12"} xs={"12"} sm={"12"} lg={"6"}>
              <RSContainer>
                <LoaderBlock>
                    {mintStatus === 2 ? (
                      <>
                        <Success /><span>Content was successfully created. You are now being sent to the preview page.</span>
                      </>
                    ) : mintStatus === 3 ? (
                      <>
                        <Error /><span>Minting failed.</span>
                      </>
                    ) : (
                      <>
                        <Load /><span>Minting in progress. This might take up to 2 minutes.</span>
                      </>
                    )}
                </LoaderBlock>
              </RSContainer>
            </SCol>
            </Row>
          </Container>
        </>
      )}
    </>
  );
}

export default MintinInProgress;
