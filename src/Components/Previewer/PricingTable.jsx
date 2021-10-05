import React from "react";
import { Table } from "react-bootstrap";
import styled from "styled-components";

// Styles  𐂂
const Name = styled.td`
  padding-left: 0px !important;
`;
const Amount = styled.td`
  text-align: right;
  padding-right: 0px !important;
`;
const FeeContainer = styled.tr`
  color: rgba(0, 0, 0, 0.25);
`;
const TotalContainer = styled.tr`
  font-weight: 700;
  color: rgba(0, 0, 0, 1);
`;

function PricingTable(props) {
  return (
    <Table borderless>
      <tbody>
        <FeeContainer>
          <Name>Owner's Fee</Name>
          <Amount>{props.OwnerFee} SOL</Amount>
        </FeeContainer>
        <FeeContainer>
          <Name>Interface Fee</Name>
          <Amount>{props.InterfaceFee} SOL</Amount>
        </FeeContainer>
        <TotalContainer>
          <Name>Total Unlock Fee</Name>
          <Amount>{props.TotalFee} SOL</Amount>
        </TotalContainer>
      </tbody>
    </Table>
  );
}

export default PricingTable;
