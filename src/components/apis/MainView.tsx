import React from "react";
import { Container, Divider } from "semantic-ui-react";
// Toast
import { SemanticToastContainer } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';
import MainHeader from "../common/MainHeader";
import ApiTable from "./table/ApiTable";


const MainView = () => (
    <div className="App">
        <MainHeader />
        <Divider />
        <Container textAlign='justified'>
            <ApiTable />
        </Container>
        <SemanticToastContainer />
    </div>
);

export default MainView;