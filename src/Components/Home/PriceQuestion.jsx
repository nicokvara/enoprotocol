import React from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";

// Styles  𐂂
const SH1 = styled.h1`
  font-weight: 700;
`;
const SBInput = styled.input`
  // Styled Button Input 𐂂
  display: block;
  margin: 50px 0 0 0;
  background-color: rgba(40, 40, 40, 1);
  border-color: rgba(40, 40, 40, 1);
  color: white;
  padding: 12px 18px 12px 18px;
  font-size: 18px;
  border-radius: 5px;
`;
const SNInput = styled.input`
  // Styled Input Field 𐂂
  font-size: 2.5rem;
  outline: none;
  border: none;

  ::placeholder {
    color: gray !important;
    opacity: 0.3 !important;
  }

  -webkit-appearance: none;
  -moz-appearance: textfield; /* Firefox */
`;
const SLabel = styled.label`
  // Styled Button Input 𐂂
  font-size: 2.5rem;
  margin: 0px 12px 0px 0px;
  color: gray !important;
  opacity: 0.3 !important;
`;

function Question() {
  return (
    <form>
      {/* Price Section 𐂂 */}
      <SH1>
        How much value you would like to capture when your content is consummed?
      </SH1>
      <br />
      <SLabel>SOL</SLabel>
      <SNInput type="number" autofocus="autofocus" placeholder="0.0001" />
      <SBInput type="submit" value="Continue" />
    </form>
  );
}

export default Question;
