import React from "react";
import { Container, Divider } from "semantic-ui-react";
// Toast
import { SemanticToastContainer } from 'react-semantic-toasts';
// Components
import HeaderMain from "../../common/HeaderMain";
import TableApis from "./table/TableApis";
import { ApiProvider } from "./ApiContext";
import { DeviceProvider } from '../../devices/components/DeviceContext';
import SearchApis from "./table/SearchApi";

const ViewApi = () => (
    <div className="App">
        <HeaderMain />
        <Divider />
        <Container textAlign='justified'>
            <ApiProvider>
                <DeviceProvider>
                    <SearchApis />
                    <TableApis />
                </DeviceProvider>
            </ApiProvider>
        </Container>
        <SemanticToastContainer />
    </div>
);

export default ViewApi;