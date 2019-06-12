import React from "react";
import {Container, Divider} from "semantic-ui-react";

import ApiHeader from "./apiHeader/ApiHeader";
import ApiList from "./ApiList/ApiList";


const ApplicationMockApi = () => (
  <div className="App">
    <ApiHeader/>
    <Divider/>
    <Container textAlign='justified'>
      <ApiList/>
    </Container>
  </div>
);

export default ApplicationMockApi;