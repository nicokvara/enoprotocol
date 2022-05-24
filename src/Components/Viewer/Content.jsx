import React from "react";
import styled from "styled-components";
import axios from 'axios';

import Badges from "../Badges";
import { Row, Col } from "react-bootstrap";
import { GetPID } from "../../Functions/GetPID";
import Header from "../DHeader";
import useSWR from "swr";

const ArticleImage = styled.img`
  max-width: 100%;
  margin-top: 18px;
  margin-bottom: 18px;
`;

const HeaderContainer = styled.div`
  margin-top: 18px;
  margin-bottom: 8px;

  user-select: none; // supported by Chrome and Opera
  -webkit-user-select: none; // Safari
  -khtml-user-select: none; // Konqueror HTML
  -moz-user-select: none; // Firefox
  -ms-user-select: none; // Internet Explorer/Edge
`;

const Paragraph = styled.div`
  line-height: 190%;
  font-size: 14px;
  overflow-wrap: break-word;
  user-select: none; // supported by Chrome and Opera
  -webkit-user-select: none; // Safari
  -khtml-user-select: none; // Konqueror HTML
  -moz-user-select: none; // Firefox
  -ms-user-select: none; // Internet Explorer/Edge
`;

const TitleContainer = styled.div`
  margin-top: 48px;
  margin-bottom: 36px;
`;

function Content({Payer, SignedAddress, data, error}) {
  // Get post using post ID 𐂂
  // const { data, error } = useSWR(
  //   `${process.env.NEXT_PUBLIC_API_URL}/articles/` + GetPID()
  // );
  
  // const fetcher = params => url => axios.post(url, params)
  // const { data, error } = useSWR(
  //   `${process.env.NEXT_PUBLIC_API_URL}/articles/${GetPID()}`,
  //   fetcher({consumer_pubkey: Payer, signed_article_address: SignedAddress})
  // );

  if (error) return <div>failed to load</div>; // Page loading state 𐂂
  if (!data) return <div>loading...</div>; // Page error state 𐂂

  // Get content and set ContentJSON

  return (
    <Row>
      <Col />
      <Col md={"9"} xs={"11"} sm={"9"} lg={"9"}>
        <TitleContainer>
          {/* The page title */}
          <Header content={data.metadata.article_title} level={1} />
        </TitleContainer>
        <Badges
          Author={data.metadata.article_author_address}
          Date={Date(data.article_created)}
        />

        {JSON.parse(data.content).map(Content => {
          switch (Content.type) {
            case "header":
              return (
                <HeaderContainer key={Content.id}>
                  <Header
                    id={Content.id}
                    level={Content.data.level}
                    content={Content.data.text}
                  />
                </HeaderContainer>
              );

            case "paragraph":
              return (
                <div key={Content.id}>
                  <Paragraph
                    dangerouslySetInnerHTML={{
                      __html: Content.data.text
                    }}
                  />
                  <br />
                </div>
              );

            case "list":
              return (
                <Paragraph>
                  <ul>
                    {Content.data.items.map(ListItem => {
                      return <li key={ListItem}>{ListItem}</li>;
                    })}
                  </ul>
                </Paragraph>
              );

            case "image":
              return <ArticleImage src={Content.data.file.url} />;
          }
        })}
      </Col>
      <Col />
    </Row>
  );
}

export default Content;
