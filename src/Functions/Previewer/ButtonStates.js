import PhantomLogo from "../../../public/Assets/PhantomLogo.svg";
import styled from "styled-components";
import Spinner from "../../../public/Assets/Animations/Spinner.jsx";
import { motion } from "framer-motion";
import Image from "next/image";

// Styles  𐂂
const StateContainer = styled.div`
  display: flex;

  min-height: 100%;
  max-height: 100%;

  min-width: 100%;
  max-width: 100%;
`;

const ImageContainer = styled.div`
  margin-bottom: -5px !important;
  margin-right: 8px;
  margin-left: auto;
`;

const SSpan = styled.span`
  margin-right: auto;
  padding: 3px 0px 0px 0px;
`;

// Button States  𐂂
export const WalletNotDetected = () => {
  return (
    <motion.div
      initial={{ opacity: 0.1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <StateContainer>
        <ImageContainer>
          <Image src={PhantomLogo} layout="fixed" width={26} height={26} />
        </ImageContainer>
        <SSpan>Phantom Not Detected</SSpan>
      </StateContainer>
    </motion.div>
  );
};

export const Loading = () => {
  return (
    <motion.div
      initial={{ opacity: 0.1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Spinner />
    </motion.div>
  );
};

export const WalletNotConnected = () => {
  return (
    <motion.div
      initial={{ opacity: 0.1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <StateContainer>
        <ImageContainer>
          <Image src={PhantomLogo} layout="fixed" width={26} height={26} />
        </ImageContainer>
        <SSpan>Connect Phantom</SSpan>
      </StateContainer>
    </motion.div>
  );
};
export const WalletConnected = () => {
  return (
    <motion.div
      initial={{ opacity: 0.1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <StateContainer>
        <ImageContainer>
          <Image src={PhantomLogo} layout="fixed" width={26} height={26} />
        </ImageContainer>
        <SSpan>Unlock with Phantom </SSpan>
      </StateContainer>
    </motion.div>
  );
};
