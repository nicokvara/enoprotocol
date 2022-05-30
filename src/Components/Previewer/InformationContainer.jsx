import React, { useEffect, useCallback, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Col } from "react-bootstrap";
import { atom, useRecoilState } from "recoil";

// Static Data 𐂂
import StaticData from "../../../public/Assets/StaticData.json";

// Components 𐂂
import Description from "./Description";
import PricingTable from "./PricingTable";
import UnlockButton from "./UnlockButton";
import OpenArticleButton from "./OpenArticleButton";
import Alert from "../Alert";

// Styles  𐂂
const SCol = styled(Col)`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RSContainer = styled.div`
  // Right Side Container. Right side includes Description, Pricing and the Button.
  margin: 0px 27px 0px 27px;
  max-width: 490px;
`;

export const IsAuthorRequest = atom({
  key: "IsAuthorRequest", // unique ID (with respect to other atoms/selectors)
  default: false // default value (aka initial value)
});

export default function InformationContainer(props) {
  const [IsAuthor, setIsAuthor] = useRecoilState(IsAuthorRequest);

  const checkAuthority = () => {
    // console.log(window?.solana?.publicKey?.toString())
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/validate_author/`, {
        article: props.PID,
        author: window?.solana?.publicKey?.toString()
      })
      .then(res => {
        setIsAuthor(res.data.success);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    setTimeout(() => checkAuthority(props.PID, window?.solana?.publicKey?.toString()), 100);
  }, []);

  return (
    <SCol md={"12"} xs={"12"} sm={"12"} lg={"6"}>
      <RSContainer>
        <Description
          Title={StaticData.Title}
          Description={StaticData.Description}
          PID={props.PID}
        />
        <PricingTable
          OwnerFee={props.OwnerFee}
          InterfaceFee={props.InterfaceFee}
          TotalFee={props.TotalFee}
        />
        {!IsAuthor && <UnlockButton />}
        {IsAuthor && <OpenArticleButton />}
        <Alert />
      </RSContainer>
    </SCol>
  );
}
