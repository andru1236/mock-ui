import React from "react";
import { Table } from "semantic-ui-react";

// Api list packages
import HeaderApiTable from './HeaderApiTable';
import FooterApiTable from './FooterApiTable';
import BodyApiListV2 from "./BodyApiListV2";

const TableApis = () => (
  <Table compact celled definition>
      <HeaderApiTable/>
      <BodyApiListV2/>
      <FooterApiTable/>
  </Table>
);

export default TableApis;