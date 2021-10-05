import React from "react";
import styled from "styled-components";

const SH2 = styled.h2`
  font-size: 1.8em;
  font-weight: 700;
  margin-bottom: -12px;
`;

const StyledLink = styled.a`
  color: rgba(40, 40, 40, 1);
`;

function Description(props) {
  return (
    <>
      <div>
        <SH2>{props.Title}</SH2> <br />
        <p>
          {props.Description} <StyledLink>{props.PID}</StyledLink>.
        </p>
      </div>
    </>
  );
}

export default Description;
