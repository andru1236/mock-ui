import React from "react";
import { Container, Divider } from "semantic-ui-react";
// Toast
import { SemanticToastContainer } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';
// Apis
// import RoutesApi from "../apis/forms/RoutesApi/RoutesApi";

import ApiRouteFeature from './ApiRouteFeature';
// Common
import MainHeader from "../../common/MainHeader";

const ApiRoutesView = () => (
    <div className="App">
        <MainHeader section="Routes"/>
        <Divider/>
        <Container textAlign='justified'>
            {/* <RoutesApi /> */ }
            <ApiRouteFeature/>
        </Container>
        <SemanticToastContainer/>
    </div>
);

export default ApiRoutesView;
