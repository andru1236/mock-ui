import React from "react";
import {Table} from "semantic-ui-react";

// Api list packages
import HeaderApiTable from './HeaderApiTable';
import FooterApiTable from './FooterApiTable';
import BodyApiListContainer from "./body/BodyApiListContainer";

const ApisTable = (props: any) => (
    <Table compact celled definition>
        <HeaderApiTable/>
        <BodyApiListContainer/>
        <FooterApiTable/>
    </Table>
);

export default ApisTable;