import React from "react";
import { Grid, Button, Header, Divider, Container } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const HeaderResponse = ({ history }) => {
  return (
    <Container>
      <Wrapper>
        <Header size={"huge"} as={"h1"} textAlign={"center"}>
          <Grid>
            <Grid.Column
              width={4}
              style={{ display: "flex", alignItems: "center" }}
            >
              <Button
                size={"huge"}
                style={{ padding: "1rem" }}
                circular
                primary
                icon={"arrow left"}
                onClick={() => history.push("/")}
              />
            </Grid.Column>
            <Grid.Column width={8}>{" Response Editor / API"}</Grid.Column>
            <Grid.Column width={4}>

            </Grid.Column>
          </Grid>
        </Header>
        <Divider />
      </Wrapper>
    </Container>
  );
};

export default withRouter(HeaderResponse);
