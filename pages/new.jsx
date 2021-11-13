import React, { useEffect } from "react";
import axios from "axios";
import Navbar from "../src/Components/Editor/Navbar";
import { Container } from "react-bootstrap";
import dynamic from "next/dynamic";
import styled from "styled-components";
import Head from "next/head";

const EditorContainer = dynamic(
  () => import("../src/Components/Editor/Editor"),
  {
    ssr: false
  }
);
const WalletModal = dynamic(() => import("../src/Components/Modal/Modal"), {
  ssr: false
});
// const Alert = dynamic(() => import("../src/Components/Alert"), {
//  ssr: false,
//});

// Styles  𐂂
const EContainer = styled.div`
  // Editor Container
  max-width: 100%;
  display: block;
  align-self: center;
  word-wrap: break-word;
`;

function Editor() {
  const [fee, setFee] = useState(0);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/mainnet_mint_fee`)
      .then(res => setFee(res.mainnet_mint_fee));
  }, []);

  return (
    <>
      <Head>
        <title>Editor</title>
      </Head>
      <WalletModal />
      <Container>
        <Navbar />
        <p>
          Please note, the Solana minting fee for this article might SOL ${fee}.
          The eno.xyz interface fee is SOL 0.
        </p>
        <EditorContainer />
        <EContainer id="editorjs" />
      </Container>
    </>
  );
}

export default Editor;
