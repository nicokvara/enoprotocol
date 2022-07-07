import React, { useEffect } from "react";
import { Row, Container, Col, Navbar, Button } from "react-bootstrap";
import styled from "styled-components";
import Logo from "../../../public/Assets/Logo.svg";
import { motion } from "framer-motion";
import { atom, useRecoilState } from "recoil";
import Image from "next/image";

// Styles 𐂂
const SButton = styled(Button)`
  max-height: 42px;
  font-size: 14px;

  :focus {
    border-width: 0;
  }
`;

// Animation 𐂂
const variants = {
  open: { opacity: 1, transition: { duration: 1.5 } },
  closed: { opacity: 0, transition: { duration: 1.5 } }
};

// Recoil Atoms 𐂂
const DefAuthorState = atom({
  key: "DefineAuthorState", // unique ID (with respect to other atoms/selectors)
  default: null // default value (aka initial value)
});
const AuthorState = atom({
  key: "AuthorState", // unique ID (with respect to other atoms/selectors)
  default: null // default value (aka initial value)
});


// CNvabat - Custom Navbar 𐂂
function CNavbar() {
  const [DefineAuthorState, setDefineAuthor] = useRecoilState(DefAuthorState);
  const [Author, setAuthor] = useRecoilState(AuthorState);

  // Connect Phantom and get the author's public key 𐂂
  const DefineAuthor = async () => {
    setDefineAuthor(false);
    const resp = await window.solana.connect();
    setAuthor(resp.publicKey.toString());
    sessionStorage.setItem('authorWallet', resp.publicKey.toString())
  };

  console.log(Author)

  useEffect(() => {
    if (DefineAuthorState && Author === null) {
      DefineAuthor();
    }
  }, [Author, DefineAuthorState]);

  useEffect(() => {
    const author = sessionStorage.getItem('authorWallet');

    if (author) {
      setAuthor(author);
    }
  })

  return (
    <Row>
      <Col>
        <motion.div animate="open" variants={variants}>
          <Navbar bg="white">
            <Container>
              <Navbar.Brand href={process.env.NEXT_PUBLIC_BASE_URL}>
                <Image alt="eno.xyz Logo" src={Logo} width={142} height={35} />
              </Navbar.Brand>
              {Author ? (
                <SButton
                  variant="outline-dark"
                >
                  {Author.slice(0, 2)}
                  ...
                  {Author.slice(Author.length - 3, Author.length)}
                </SButton>
              ) : (
                <SButton
                  onClick={() => setDefineAuthor(true)}
                  variant="outline-dark"
                >
                  Connect wallet
                </SButton>
              )}
            </Container>
          </Navbar>
        </motion.div>
      </Col>
    </Row>
  );
}

export default CNavbar;
