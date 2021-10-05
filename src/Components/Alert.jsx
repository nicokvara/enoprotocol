import React from "react";
import { Alert } from "react-bootstrap";
import styled from "styled-components";

// Styles  𐂂
const SAlert = styled(Alert)`
  max-width: 646px;
  margin: 0.5vh auto 1vh auto;
`;
const SAH = styled(Alert.Heading)`
  font-weight: 700;
  font-size: 15px;
  margin-bottom: 2px;
`;
const Sp = styled.p`
  margin: 0px;
`;

export default function AlertFunction() {
  try {
    const isPhantomInstalled = window.solana && window.solana.isPhantom;
    return (
      <>
        {isPhantomInstalled !== true && (
          <SAlert variant="danger">
            <SAH>Please install Phantom Wallet</SAH>
            <Sp>
              To continue please install Phantom Wallet. If installed open it
              and refresh the page. Mobile device support is coming soon.
            </Sp>
          </SAlert>
        )}
      </>
    );
  } catch (error) {
    console.log(error);
  }
  return <> </>;
}
