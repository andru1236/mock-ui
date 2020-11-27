import React, { Fragment } from 'react';
import { Header } from "semantic-ui-react";

import AddPathFormInLine from './forms/AddPathFormInLine';
import PathsTable from "./table/PathsTable";


const ApiRouteFeatureV2 = () => {
    return (
        <Fragment>
            <Header as={ "h3" }> Add route </Header>
            <AddPathFormInLine />
            <PathsTable />
        </Fragment>
    );
}

export default ApiRouteFeatureV2;