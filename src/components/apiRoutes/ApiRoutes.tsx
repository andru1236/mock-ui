import React from "react";
import { Container, Divider } from "semantic-ui-react";
// Toast
import { SemanticToastContainer } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';
import ApiHeader from "../apiHeader/ApiHeader";
import RoutesApi from "../ApiList/forms/RoutesApi/RoutesApi";


const ApplicationMockApi = () => (
    <div className="App">
        <ApiHeader />
        <Divider />
        <Container textAlign='justified'>
            <RoutesApi />
        </Container>
        <SemanticToastContainer />
    </div>
);

export default ApplicationMockApi;