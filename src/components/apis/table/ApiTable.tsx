import React from "react";
import {Table} from "semantic-ui-react";
// Container
import CreateApi from '../forms/CreateApi/CreateApi';

// Api list components
import HeaderApiTable from './HeaderApiTable';
import FooterApiTable from './FooterApiTable';
import BodyApiListContainer from "./body/BodyApiListContainer";
import RemoveApi from "../forms/RemoveApi/RemoveApi";
import UpdateApi from "../forms/UpdateApi/UpdateApi";

const ApiTable = (props: any) => (
    <Table compact celled definition>
        <HeaderApiTable/>
        <BodyApiListContainer/>
        <FooterApiTable/>

        {/*Forms*/}
        <UpdateApi/>
        <RemoveApi/>
        <CreateApi/>
    </Table>
);

export default ApiTable;