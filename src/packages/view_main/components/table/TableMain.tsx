import React from "react";
import { Table } from "semantic-ui-react";

// Components
import HeaderTable from "./HeaderTable";
import TableBody from "./TableBody";
import TableFooter from "./TableFooter";

const TableMain = () => (
    <Table compact celled definition>
        <HeaderTable />
        <TableBody />
        <TableFooter />
    </Table>
);

export default TableMain;