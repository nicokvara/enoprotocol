import React, { useEffect } from "react";
import { Row, Container, Col, Navbar, Button } from "react-bootstrap";
import styled from "styled-components";
import { useRouter } from "next/router";
import { atom, useRecoilState } from "recoil";
import axios from "axios";

// Styles 𐂂
const SButton = styled(Button)`
  max-height: 42px;
  font-size: 14px;
  color: rgb(102, 187, 106);
  border-color: rgb(102, 187, 106);
  margin: 0 0 0 auto;

  :hover {
    bacground: rgb(102, 187, 106);
    bacground-color: rgb(102, 187, 106);
    color: #ffffff;
  }

  :focus {
    border-width: 0;
  }
`;

const IsAuthorRequest = atom({
  key: "IsAuthorRequest", // unique ID (with respect to other atoms/selectors)
  default: false // default value (aka initial value)
});

const Header = () => {
  const [InterfaceFee, setInterfaceFee] = useState(0);
  const [IsAuthor, setIsAuthor] = useRecoilState(IsAuthorRequest);

  const router = useRouter();
  const { PID } = router.query;

  const checkAuthority = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/check/`, {
        article: PID,
        author: window?.solana.publicKey.toString()
      })
      .then(res => {
        setIsAuthor(res.data.has_access);
      });
  };

  useEffect(() => {
    if (window?.solana) {
      checkAuthority();
    }
  }, [window?.solana]);

  const handleRedirect = () => {};

  return IsAuthor ? (
    <Row>
      <Col>
        <Navbar bg="white">
          <Container>
            <SButton onClick={handleRedirect} variant="outline-dark">
              Open
            </SButton>
          </Container>
        </Navbar>
      </Col>
    </Row>
  ) : null;
};