import React from "react";
import Spinner from "../../public/Assets/Animations/Spinner.jsx";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";

// Styles 𐂂
const Title = styled.h6`
  font-weight: 700;
  text-align: center;
  opacity: 0.4;
  margin: 10px 0px 10px 0px;
`;
const Description = styled.p`
  text-align: center;
  opacity: 0.4;
`;
const SCol = styled(Col)`
  height: 85vh;
  display: flex;
  justify-content: left;
  align-items: center;
  margin: 0px 24px 0px 24px;
`;
const Div = styled.div`
  display: block;
  width: auto;
  margin: auto;
`;

function Loader(props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: +10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1,
        type: "spring",
        ease: "circInOut",
      }}
      exit={{ opacity: 0 }}
    >
      <Container>
        <Row>
          <SCol>
            <Div>
              <Spinner />
              <Title>{props.Title}</Title>
              <Description>{props.Description}</Description>
            </Div>
          </SCol>
        </Row>
      </Container>
    </motion.div>
  );
}

export default Loader;
