import React from "react";
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
  closed: { opacity: 0, transition: { duration: 1.5 } },
};

// Recoil Atoms 𐂂
const isTypingState = atom({
  key: "isTypingState", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});
const FirePostRequest = atom({
  key: "FirePostRequest", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});
const SaveContentState = atom({
  key: "SaveContentState", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

// CNvabat - Custom Navbar 𐂂
function CNavbar() {
  const [isTyping, setIsTyping] = useRecoilState(isTypingState);
  const [Fire, setFire] = useRecoilState(FirePostRequest);
  const [SaveContent, setSaveContent] = useRecoilState(SaveContentState);

  return (
    <Row>
      <Col>
        <motion.div animate={isTyping ? "closed" : "open"} variants={variants}>
          <Navbar bg="white">
            <Container>
              <Navbar.Brand href="https://cntn.xyz/">
                <Image
                  alt="content.xyz Logo"
                  src={Logo}
                  width={31}
                  height={31}
                />
              </Navbar.Brand>
              <SButton
                onClick={() => setFire(true)}
                onMouseEnter={() => setSaveContent(true)}
                variant="outline-dark"
              >
                Publish
              </SButton>
            </Container>
          </Navbar>
        </motion.div>
      </Col>
    </Row>
  );
}

export default CNavbar;
