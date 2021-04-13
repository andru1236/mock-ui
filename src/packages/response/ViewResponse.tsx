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
        <Container textAlign="justified" fluid className="response-content">
          <Grid>

            <Grid.Column className="responses-table">
              <TableResponses />
            </Grid.Column>

            <Grid.Column className="response-editor">
              <EditorResponse />
            </Grid.Column>

            <Grid.Column className="response-assign-api">
              <Header as={'h2'}>
                Assign
                </Header>
              <ButtonAssignRoute />
            </Grid.Column>

            <Grid.Column className="apis-table">
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
