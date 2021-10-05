import React from "react";
import styled from "styled-components";
import { Col } from "react-bootstrap";

// Static Data 𐂂
import StaticData from "../../../public/Assets/StaticData.json";

// Components 𐂂
import Description from "./Description";
import PricingTable from "./PricingTable";
import UnlockButton from "./UnlockButton";
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

export default function InformationContainer(props) {
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
        <UnlockButton />
        <Alert />
      </RSContainer>
    </SCol>
  );
}
