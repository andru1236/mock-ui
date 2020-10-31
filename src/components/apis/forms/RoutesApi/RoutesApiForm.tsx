import * as React from 'react';
import { Button, Container, Grid, Header } from "semantic-ui-react";
import RoutesTable from './Table/RoutesTable';
import AddRouteForm from "./AddRouteForm/AddRouteForm";
import { IApiInstance } from "../../../../domain/IApiInstance";

interface IViewProps {
    selectedApi: IApiInstance;
    history: any;
    reloadApis(): void;
    closeForm(): void;
}

const RoutesApiForm = (props: IViewProps) => (
    <Container>
        <Grid>
            <Grid.Column textAlign="left">
                <Button labelPosition='left' icon='left chevron' size='mini' content='Apis'
                    onClick={() => props.history.push('/')}
                />
                {`API: ${props.selectedApi.name} | PORT: ${props.selectedApi.port}`}
            </Grid.Column>
        </Grid>
        <Header as={"h3"}> Add route </Header>

        <AddRouteForm selectecApi={props.selectedApi} reloadApis={props.reloadApis} closeForm={props.closeForm} />

        <RoutesTable selectedApi={props.selectedApi} reloadApis={props.reloadApis} closeForm={props.closeForm} />
    </Container>
);

export default RoutesApiForm;
