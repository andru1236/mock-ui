import React from "react";
import {Container, Divider} from "semantic-ui-react";
// Toast
import {SemanticToastContainer} from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';
import ApiHeader from "./apiHeader/ApiHeader";
import ApiList from "./ApiList/ApiList";


const ApplicationMockApi = () => (
    <div className="App">
        <ApiHeader/>
        <Divider/>
        <Container textAlign='justified'>
            <ApiList/>
        </Container>
        <SemanticToastContainer/>
    </div>
);

export default ApplicationMockApi;