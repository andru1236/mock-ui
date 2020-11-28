import React from "react";
import { Container, Divider } from "semantic-ui-react";
// Toast
import { SemanticToastContainer } from 'react-semantic-toasts';
// Components
import HeaderMain from "../../common/HeaderMain";
import TableApis from "./table/TableApis";
import { ApiProvider } from "./ApiContext";


const ViewApi = () => (
  <div className="App">
      <HeaderMain/>
      <Divider/>
      <Container textAlign='justified'>
          <ApiProvider>
              <TableApis/>
          </ApiProvider>
      </Container>
      <SemanticToastContainer/>
  </div>
);

export default ViewApi;