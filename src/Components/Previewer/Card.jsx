import React from "react";
import styled from "styled-components";
import Logo from "../../../public/Assets/Logo.svg";
import Image from "next/image";

// Styles  𐂂
const SContainer = styled.div`
  min-width: 100%;
  min-height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 375px) {
    margin-top: -100px;
  }
`;
const SCard = styled.div`
  border-radius: 15px;
  border-width: 1px;
  border-color: rgba(241, 241, 241, 1);
  border-style: solid;
  box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.05);

  text-align: center;

  // Size 𐂂
  width: 330px;
  height: 430px;

  min-width: 250px;
  min-height: 350px;

  // Positioning 𐂂
  display: flex;
  justify-content: center;
  align-items: center;

  // Animation 𐂂
  animation: 3000ms cubic-bezier(0.25, 0.46, 0.45, 0.94) slideInFromLeft;

  @keyframes slideInFromLeft {
    0% {
      transform: scale(0.9) rotate(0deg);
      box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0);
      border-color: rgba(241, 241, 241, 0);
    }
    100% {
      border-color: rgba(241, 241, 241, 1);

      transform: scale(1) rotate(0deg);
      box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.05);
    }
  }
`;
const SDiv = styled.div`
  margin: 38px;
`;
const SH1 = styled.h1`
  font-size: 18px;
  margin: 16px 0px 16px 0px;
  font-weight: 700;
  overflow-wrap: break-word;
`;
const SP = styled.p`
  font-size: 14px;
  overflow-wrap: break-word;
`;

function Card(props) {
  return (
    <SContainer>
      <SCard>
        <SDiv>
          <Image src={Logo} alt="eno.xyz Logo" width={80} height={31} />

          <SH1>{props.Title}</SH1>

          <SP>{props.Description}</SP>
        </SDiv>
      </SCard>
    </SContainer>
  );
}

export default Card;
