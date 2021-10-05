import React from "react";
import lottie from "lottie-web";
import styled from "styled-components";
import Spinner from "./Spinner.json";

const Container = styled.div`
  max-width: 30px;
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
`;

export default function SpinnerAnimation() {
  React.useEffect(() => {
    lottie.loadAnimation({
      container: document.querySelector("#Spinner"),
      animationData: Spinner,
    });
  }, []);

  return <Container id="Spinner" />;
}
