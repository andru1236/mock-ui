import React from "react";
import { Container, Divider } from "semantic-ui-react";
// Toast
import { SemanticToastContainer } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';
// Apis
import RoutesApi from "../apis/forms/RoutesApi/RoutesApi";
// Common
import MainHeader from "../common/MainHeader";

const ApplicationMockApi = () => (
    <div className="App">
        <MainHeader section="Routes" />
        <Divider />
        <Container textAlign='justified'>
            <RoutesApi />
        </Container>
        <SemanticToastContainer />
    </div>
);

export default ApplicationMockApi;
