import * as React from 'react';
import {Button, Header, Modal} from "semantic-ui-react";
import RoutesTable from './Table/RoutesTable';
import AddRouteForm from "./AddRouteForm/AddRouteForm";
import {IApiInstance} from "../../../../domain/IApiInstance";

interface IViewProps {
    isModalOpen: boolean;
    selectedApi: IApiInstance;

    reloadApis(): void;

    closeForm(): void;
}


const RoutesApiForm = (props: IViewProps) => (
    <Modal size={'large'} open={props.isModalOpen}>
        <Modal.Header>Create new api</Modal.Header>
        <Modal.Content>
            <Modal.Description>

                <Header as={"h3"}> Add route </Header>

                <AddRouteForm reloadApis={props.reloadApis}/>

                <RoutesTable selectedApi={props.selectedApi} reloadApis={props.reloadApis}/>

            </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
            <Button onClick={props.closeForm}>
                Close
            </Button>
        </Modal.Actions>
    </Modal>
);

export default RoutesApiForm;