import React from "react";
import { Container, Grid, Header, Segment } from "semantic-ui-react";
import { ResponseProvider } from './ResponseContext'
import { SemanticToastContainer } from 'react-semantic-toasts';
import HeaderResponse from "./components/HeaderResponse";
import EditorResponse from "./components/EditorResponse";
import TableResponses from "./components/TableResponses";
import ButtonAssignRoute from './components/ButtonAssignRoute';
import TableApis from "./components/TableApis";


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

            <Grid.Column width={1} style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
              <Header as={'h2'}>
                Assign
                </Header>
              <ButtonAssignRoute />
            </Grid.Column>

            <Grid.Column width={5}>
              <TableApis />
            </Grid.Column>

          </Grid>
        </Container>
        <SemanticToastContainer />
      </ResponseProvider>
    </div>
  );
};

export default ViewResponse;
