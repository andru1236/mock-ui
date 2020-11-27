import React from "react";
import { Container, Divider } from "semantic-ui-react";
// Toast
import { SemanticToastContainer } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';
// Apis
// import RoutesApi from "../apis/forms/RoutesApi/RoutesApi";

import ApiRouteFeatureV2 from './ApiRouteFeatureV2';
// Common
import MainHeader from "../../common/MainHeader";
import GoToApiButton from "./GoToApiButton";
import { PathProvider } from "./PathContext";

const ApiRoutesView = () => (
    <PathProvider>
        <div className="App">
            <MainHeader section="Routes"/>
            <Divider/>
            <Container textAlign='justified'>
                {/* <RoutesApi /> */ }
                <GoToApiButton/>
                <ApiRouteFeatureV2/>
            </Container>
            <SemanticToastContainer/>
        </div>
    </PathProvider>
);

export default ApiRoutesView;
