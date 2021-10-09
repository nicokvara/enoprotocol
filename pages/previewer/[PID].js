import React, { useState, useEffect } from "react";
import { Row, Container, Col, Navbar, Button } from "react-bootstrap";
import useSWR from "swr";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { atom, useRecoilState } from "recoil";

// Components 𐂂
import InformationContainer from "../../src/Components/Previewer/InformationContainer";
import CardContainer from "../../src/Components/Previewer/CardContainer";
import Meta from "../../src/Components/ArticleHeaders";

// Disabled SSR 𐂂
const Loader = dynamic(() => import("../../src/Components/Loader"), {
  ssr: false
});
const WalletModal = dynamic(() => import("../../src/Components/Modal/Modal"), {
  ssr: false
});

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

function Previewer() {
  const [InterfaceFee, setInterfaceFee] = useState(0);
  const [IsAuthor, setIsAuthor] = useRecoilState(IsAuthorRequest);

  const router = useRouter();
  const { PID } = router.query;

  // Get the post using the ID 𐂂
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/articles/` + PID
  );

  const checkAuthority = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/check/`, {
        article: PID,
        author: window.solana.publicKey.toString()
      })
      .then(res => {
        setIsAuthor(res.data.has_access);
      });
  };

  useEffect(() => checkAuthority(), [window.solana]);

  const handleRedirect = () => {};

  return (
    <>
      {error && <div>failed to load</div>}
      {!data && <Loader Title="Loading Previewer" Description="Please wait" />}
      {data && (
        <>
          <WalletModal />
          <Meta
            title={data.metadata.article_title}
            description={data.metadata.article_description}
            url={`${process.env.NEXT_PUBLIC_API_URL}/articles/` + PID}
          />
          <Container>
            {IsAuthor && (
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
            )}
            <Row>
              <CardContainer
                Title={data.metadata.article_title}
                Description={data.metadata.article_description}
              />
              <InformationContainer
                PID={PID}
                OwnerFee={data.metadata.article_price}
                InterfaceFee={InterfaceFee}
                TotalFee={data.metadata.article_price + InterfaceFee}
              />
            </Row>
          </Container>
        </>
      )}
    </>
  );
}

export default Previewer;
