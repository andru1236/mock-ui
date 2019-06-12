import React from "react";
import {Table} from "semantic-ui-react";
// Container
import CreateApi from './forms/CreateApi/CreateApi';

// Api list components
import HeaderApiList from './Header/HeaderApiList';
import FooterApiListContainer from "./Footer/FooterApiListContainer";
import BodyApiListContainer from "./Body/BodyApiListContainer";
import RemoveApi from "./forms/RemoveApi/RemoveApi";
import UpdateApi from "./forms/UpdateApi/UpdateApi";
import RoutesApi from "./forms/RoutesApi/RoutesApi";

const ApiList = (props: any) => (
    <Table compact celled definition>
        <HeaderApiList/>
        <BodyApiListContainer/>
        <FooterApiListContainer/>

        {/*Forms*/}
        <RoutesApi/>
        <UpdateApi/>
        <RemoveApi/>
        <CreateApi/>
    </Table>
);

export default ApiList;