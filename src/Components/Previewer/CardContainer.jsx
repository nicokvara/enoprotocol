import React from "react";
import styled from "styled-components";
import { Col } from "react-bootstrap";

// Components 𐂂
import Card from "./Card";
import Scroll from "../../../public/Assets/Animations/Scroll.jsx";

// Styles  𐂂
const SCol = styled(Col)`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function CardContainer(props) {
  return (
    <SCol md={"12"} xs={"12"} sm={"12"} lg={"6"}>
      <Card Title={props.Title} Description={props.Description} />
      <Scroll />
    </SCol>
  );
}
