import React, { useState } from 'react';
import { Button } from "semantic-ui-react";
import { withResponseConsumer, ResponseContextProps } from '../ResponseContext';
import { assignResponseToApi } from '../sources/gql';
import AlertConfirmation from './AlertConfirmation';

const ButtonAssignRoute = ({ selectedApi, selectedResponse, selectedRouteToUpdate, unSelectResponse, unSelectApi }: ResponseContextProps) => {
    const [open, setOpen] = useState(false);

    const assignValidation = (): boolean => {
        if (selectedApi._id === "") {
            return false;
        }
        if (selectedResponse._id === "") {
            return false;
        }
        if (selectedRouteToUpdate.path === "" && selectedRouteToUpdate.method === "") {
            return false;
        }
        return true
    };

    const assignResponse = () => {
        assignResponseToApi(selectedResponse._id, selectedApi._id, selectedRouteToUpdate.path, selectedRouteToUpdate.method, true);
        unSelectResponse();
        unSelectApi();
    };

    if (assignValidation()) {
        return (
            <>
                <Button icon={"arrow right"} size={"huge"} circular color={"green"} onClick={assignResponse} />
            </>
        )
    } else {
        return (
            <>
                <Button icon={"arrow right"} size={"huge"} circular color={"red"} onClick={() => setOpen(true)} />
                <AlertConfirmation
                    open={open}
                    closeForm={() => setOpen(false)}
                    callback={() => false}
                    title={'Select a response and an api'}
                    content={'Select a response from the Responses table, Select a resource from API/Route/Resource'}
                />
            </>
        )
    }


};

export default withResponseConsumer(ButtonAssignRoute);