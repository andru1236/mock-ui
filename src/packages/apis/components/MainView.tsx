import React from "react";
import { Container, Divider } from "semantic-ui-react";
// Toast
import { SemanticToastContainer } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';
// Components
import MainHeader from "../../common/MainHeader";
import ApisTable from "./table/ApisTable";


const MainView = () => (
    <div className="App">
        <MainHeader/>
        <Divider/>
        <Container textAlign='justified'>
            <ApisTable/>
        </Container>
        <SemanticToastContainer/>
    </div>
);

export default MainView;