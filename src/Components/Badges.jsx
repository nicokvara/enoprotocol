import React from "react";
import { Badge } from "react-bootstrap";
import styled from "styled-components";

// Styles  𐂂
const StyledBadge = styled(Badge)`
  background-color: #f5f5f4 !important;
  color: #949393;
  font-size: 11px;
  margin-bottom: 18px;
  margin-right: 9px;
`;

export default function Badges(props) {
  return (
    <>
      <StyledBadge>{props.Author}</StyledBadge>
      <StyledBadge>{props.Date}</StyledBadge>
    </>
  );
}
