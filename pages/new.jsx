import React from "react";
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
  return (
    <>
      <Head>
        <title>Editor</title>
      </Head>
      <WalletModal />
      <Container>
        <Navbar />
        <EditorContainer />
        <EContainer id="editorjs" />
      </Container>
    </>
  );
}

export default Editor;
