import React from "react";
import { Container, Divider } from "semantic-ui-react";
// Toast
import { SemanticToastContainer } from 'react-semantic-toasts';
// Components
import HeaderMain from "../../common/HeaderMain";
import { ApiProvider } from "../../apis/components/ApiContext";
import { DeviceProvider } from "../../devices/components/DeviceContext";
import SearchEntities from "./SearchEntities";
import { SearchProvider } from "../SearchContext";
import TableMain from "./table/TableMain";

const ViewMain = () => (
    <div className="App">
        <HeaderMain />
        <Divider />
        <Container textAlign='justified'>
            <ApiProvider>
                <DeviceProvider>
                    <SearchProvider>
                        <SearchEntities />
                        <TableMain />
                    </SearchProvider>
                </DeviceProvider>
            </ApiProvider>
        </Container>
        <SemanticToastContainer />
    </div>
);

export default ViewMain;