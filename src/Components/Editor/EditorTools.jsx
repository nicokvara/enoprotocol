import React from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";

const SDiv = styled.div`
  margin: auto;
  min-width: 650px;
  max-width: 650px;
  background-color: #ffff;

  border-width: 1px;
  border-style: solid;
  border-color: rgba(191, 194, 198, 0.4);
  border-radius: 5px;

  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);

  min-height: 60px;

  position: sticky;
  bottom: 5vh;
`;

const SButton = styled(Button)`
  background-color: rgba(40, 40, 40, 1);
  color: rgba(252, 247, 248, 1);

  position: absolute;
  right: 9px;
  top: 9px;

  max-height: 42px;
`;

const STool = styled(Button)`
  background-color: rgba(40, 40, 40, 1);
  color: rgba(252, 247, 248, 1);

  position: absolute;
  left: 9px;
  top: 9px;
  max-height: 42px;
`;

function EditorTools() {
  return (
    <SDiv>
      <SButton variant="dark">Post</SButton>
    </SDiv>
  );
}

export default EditorTools;
