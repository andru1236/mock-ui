import * as React from 'react';
import { Button, Container, Header } from "semantic-ui-react";
import RoutesTable from './Table/RoutesTable';
import AddRouteForm from "./AddRouteForm/AddRouteForm";
import { IApiInstance } from "../../../../domain/IApiInstance";

interface IViewProps {
    isModalOpen: boolean;
    selectedApi: IApiInstance;
    history: any;
    reloadApis(): void;
    closeForm(): void;
}

const RoutesApiForm = (props: IViewProps) => (
    <Container>
        <Button labelPosition='left' icon='left chevron' size='mini' content='Apis'
        onClick={() => props.history.push('/')}
        />
        <Header as={"h3"}> Add route </Header>

        <AddRouteForm selectecApi={props.selectedApi} reloadApis={props.reloadApis} closeForm={props.closeForm} />

        <RoutesTable selectedApi={props.selectedApi} reloadApis={props.reloadApis} closeForm={props.closeForm} />
    </Container>
);

export default RoutesApiForm;