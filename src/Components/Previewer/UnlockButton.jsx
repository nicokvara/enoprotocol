import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import {
  WalletNotDetected,
  Loading,
  WalletNotConnected,
  WalletConnected
} from "../../Functions/Previewer/ButtonStates";
import { GetPID } from "../../Functions/GetPID";
import Router from "next/router";

// Styles  𐂂
const SButton = styled(Button)`
  display: block;
  width: 100%;
  background-color: rgba(40, 40, 40, 1);
  color: rgba(252, 247, 248, 1);

  padding: 10px 0 10px 0;
  margin: 0px 0px 24px 0px;
  font-size: 16px;

  &:disabled {
    opacity: 85%;
  }
`;

function UnlockButton() {
  const [ButtonState, setButtonState] = useState(Loading);
  const [ButtonDisabled, setButtonDisabled] = useState(false);

  // Disables button for those without Phantom Wallet 𐂂

  useEffect(() => {
    if (window.solana === undefined) {
      setButtonDisabled(true);
      setButtonState(WalletNotDetected);
    } else {
      setButtonState(WalletConnected);
    }
  }, []);

  // Fires when button is clicked 𐂂
  const ClickHandler = async () => {
    // Sets button to loading 𐂂
    await new Promise(resolve => {
      setButtonState(Loading);
      setTimeout(() => {
        resolve(setButtonState(WalletNotConnected)); // Sets back to previous state if nothing happened 𐂂
      }, 5000);
    });
    // Connects to Phantom and opens the viewer 𐂂
    try {
      window.solana.connect();
      window.solana.on("connect", () => {
        Router.push("/viewer/" + GetPID());
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SButton
      variant="dark"
      onClick={() => {
        ClickHandler();
      }}
      disabled={ButtonDisabled}
    >
      {ButtonState}
    </SButton>
  );
}

export default UnlockButton;
