import React from "react";
import lottie from "lottie-web";
import styled from "styled-components";
import Scroll from "./Scroll.json";

const Container = styled.div`
  @media screen and (max-width: 991px) {
    max-width: 70px !important;
    margin-left: auto;
    margin-right: auto;
    margin-top: auto;
    margin-bottom: auto;

    position: absolute;

    bottom: 15px;

    opacity: 15%;
  }
`;

export default function ScrollAnimation() {
  React.useEffect(() => {
    lottie.loadAnimation({
      container: document.querySelector("#Scroll"),
      animationData: Scroll,
    });
  }, []);

  return <Container id="Scroll" />;
}
