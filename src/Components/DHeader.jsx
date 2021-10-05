// Dynamic Header 𐂂

import React from "react";
import styled from "styled-components";

const H1 = styled.h1`
  font-size: 48px;
  font-weight: 700;
  display: inline;
`;

const H2 = styled.h2`
  // font-size: 22px;
  font-size: 1.8em;
  font-weight: 700;
  display: inline;
`;

const H3 = styled.h3`
  font-size: 1.5em;
  font-weight: 700;
  display: inline;
`;

const H4 = styled.h4`
  font-size: 1em;
  font-weight: 700;
  display: inline;
`;

export default function DynamicHeader(props) {
  switch (props.level) {
    case 1:
      return <H1 id={props.id}>{props.content}</H1>;

    case 2:
      return <H2 id={props.id}>{props.content}</H2>;

    case 3:
      return <H3 id={props.id}>{props.content}</H3>;

    case 4:
      return <H4 id={props.id}>{props.content}</H4>;
  }
}
