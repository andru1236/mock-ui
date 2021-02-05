import React from "react";
import { Button, Container, Grid } from "semantic-ui-react";

import HeaderResponse from "./HeaderResponse";
import EditorResponse from "./EditorResponse";
import TableResponses from "./TableResponses";
import TableApis from "./TableApis";
import { ResponseProvider } from './ResponseContext'

const ViewResponse = () => {
  return (
    <div className="App">
      <ResponseProvider>
        <HeaderResponse />
        <Container textAlign="justified" fluid style={{ width: "95%" }}>
          <Grid>

            <Grid.Column width={3}>
              <TableResponses />
            </Grid.Column>

            <Grid.Column width={7}>
              <EditorResponse />
            </Grid.Column>

            <Grid.Column width={1} style={{ display: "flex", alignItems: "center" }}>
              <Button icon={"arrow right"} size={"huge"} circular color={"red"} />
            </Grid.Column>

            <Grid.Column width={5}>
              <TableApis />
            </Grid.Column>

          </Grid>
        </Container>
      </ResponseProvider>
    </div>
  );
};

export default ViewResponse;
