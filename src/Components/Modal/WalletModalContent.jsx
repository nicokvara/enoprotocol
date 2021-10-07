import React, { useEffect } from "react";
import Image from "next/image";
import PhantomLogo from "../../../public/Assets/PhantomLogoColored.svg";
import styled from "styled-components";
import { Button, Modal } from "react-bootstrap";
import { Connect, Install } from "./WalletModalFunctions";

// Styles 𐂂
const ModalBody = styled(Modal.Body)`
  width: 363px;
  height: 598px;
`;
const ImgContainer = styled.div`
  display: block;
  width: 70px;
  margin: 35% auto 24px auto;
  justify-content: center;
  align-items: center;
`;
const SH1 = styled.h1`
  font-weight: 700;
  font-size: 1.5rem;
  text-align: center;
`;
const SP = styled.p`
  margin: auto auto 35% auto;
  text-align: center;
`;
const ConnectButton = styled(Button)`
  display: block;
  width: 100%;
  background-color: rgba(40, 40, 40, 1);
  color: rgba(252, 247, 248, 1);

  padding: 10px 0 10px 0;
  margin: 0px 0px 12px 0px;
  font-size: 16px;
`;
const InstallButton = styled(Button)`
  display: block;
  width: 100%;
  background-color: #ffffff;
  color: #000000;

  padding: 10px 0 10px 0;
  margin: 0px 0px 24px 0px;
  font-size: 16px;
`;

function WalletModalContent({ handleClose }) {
  return (
    <ModalBody>
      <ImgContainer>
        <Image src={PhantomLogo} />
      </ImgContainer>
      <SH1>Please Connect Your Phantom Wallet</SH1>
      <SP>
        To use əno please connect your wallet. After connecting your public key
        will be used as your username. No additional information required.
      </SP>
      <ConnectButton variant="dark" onClick={() => Connect(handleClose)}>
        Connect Phantom
      </ConnectButton>
      <InstallButton variant="light" onClick={Install}>
        Install Phantom Wallet
      </InstallButton>
    </ModalBody>
  );
}

export default WalletModalContent;
