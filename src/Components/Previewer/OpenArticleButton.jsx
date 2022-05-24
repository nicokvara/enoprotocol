import React, { useEffect, useCallback, useState } from "react";
import { Row, Col, Navbar, Button } from "react-bootstrap";
import styled from "styled-components";
import { useRouter } from "next/router";
import { atom, useRecoilState } from "recoil";
import axios from "axios";
import Image from "next/image";
import Logo from "../../../public/Assets/Logo.svg";

// Styles 𐂂
const SButton = styled(Button)`
  display: block;
  width: 100%;
  background: #F8F9FA;
  color: #3B3B3B;

  padding: 10px 0 10px 0;
  margin: 0px 0px 12px 0px;
  font-size: 16px;
  border: 1px solid #F8F9FA;

  :hover {
    background: #F8F9FA;
    color: #3B3B3B;
    border: 1px solid #F8F9FA;
  }
`

const Container = styled.div `
`;

const Description = styled.span`
  font-size: 12px;
  color: #212529;
  margin: 0 0 0 auto;
  transition: opacity 300ms;
`;

const Header = () => {
  const [style, setStyle] = useState({opacity: '0%'});

  const router = useRouter();
  const { PID } = router.query;

  const handleRedirect = () => router.push("/viewer/" + PID);

  return (
    <Container>
      <SButton
        onClick={handleRedirect}
        variant="outline-dark"
        onMouseEnter={e => {
          setStyle({opacity: '100%'});
        }}
        onMouseLeave={e => {
          setStyle({opacity: '0%'})
        }}  
      >
        Open the article
      </SButton>
      <Description style={style}>
        As the content owner, you can open this article without paying the unlock fee.
      </Description>
    </Container>
  );
};

export default Header;
