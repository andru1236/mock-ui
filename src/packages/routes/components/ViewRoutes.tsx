import React from "react";
import { Container, Divider, Header } from "semantic-ui-react";
// Toast
import 'react-semantic-toasts/styles/react-semantic-alert.css';
import { SemanticToastContainer } from 'react-semantic-toasts';
import { PathProvider } from "./PathContext";

// Common
import HeaderMain from "../../common/HeaderMain";
import ButtonGoToViewApi from "./ButtonGoToViewApi";
import FormInLineAddRoute from "./forms/FormInLineAddRoute";
import TableRoutes from "./table/TableRoutes";

const ViewRoutes = () => (
  <PathProvider>
      <div className="App">
          <HeaderMain section="Routes"/>
          <Divider/>
          <Container textAlign='justified'>
              <ButtonGoToViewApi/>
              <Header as={ "h3" }> Add route </Header>
              <FormInLineAddRoute/>
              <TableRoutes/>
          </Container>
          <SemanticToastContainer/>
      </div>
  </PathProvider>
);

export default ViewRoutes;
