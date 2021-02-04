import React from "react";
import { Button, Container, Grid } from "semantic-ui-react";

import HeaderResponse from "./HeaderResponse";
import EditorResponse from "./EditorResponse";
import TableResponses from "./TableResponses";
import TableApis from "./TableApis";

const ViewResponse = () => {
  return (
    <div className="App">
      <HeaderResponse />
      <Container textAlign="justified" fluid style={{ width: "95%" }}>
        <Grid>
          <Grid.Column width={3}>
            <TableResponses />
          </Grid.Column>
          <Grid.Column width={8}>
            <EditorResponse />
          </Grid.Column>
          <Grid.Column width={2} style={{ display: "flex", alignItems: "center" }}>
            <Button icon={"arrow right"} size={"huge"} circular color={'red'}/>
          </Grid.Column>
          <Grid.Column width={3}>
            <TableApis />
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
};

export default ViewResponse;
