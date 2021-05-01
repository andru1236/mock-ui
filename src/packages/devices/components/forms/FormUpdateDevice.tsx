import React, { useState, useEffect } from "react";
import { Button, Form, TextArea } from "semantic-ui-react";
import emmitToastMessage from "../../../common/emmitToastMessage";
import { withDeviceConsumer, DeviceContextProps } from "../DeviceContext";

import { updateDevice, getOneDevice, fixAgentDb } from "../../sources/gql";


const FormUpdateDevice = ({ selectedDevice, setSelectedDevice }: DeviceContextProps) => {
    const [name, setName] = useState("");
    const [port, setPort] = useState(0);
    const [agentDb, setAgentDb] = useState("");
    const [loadingFields, setLoadingFields] = useState(true);

    const handlerName = (event: any) => setName(event.target.value);
    const handlerPort = (event: any) => setPort(parseInt(event.target.value));
    const handlerAgentDb = (event: any) => setAgentDb(event.target.value);

    const ensureValidFields = () => {
        if (name === '' && port === 0) {
            emmitToastMessage.error('Error on Fields', 'name should be a strings and port should be a number');
            return false;
        }
        return true;
    };

    const submitFn = async (event) => {
        event.preventDefault();
        if (ensureValidFields()) {
            setLoadingFields(true)
            await updateDevice(selectedDevice.id, name, port, agentDb);
            setSelectedDevice(await getOneDevice(selectedDevice.id));
            setLoadingFields(false);
        }
    }

    const actionFixAgent = async () => {
        const response = await fixAgentDb(agentDb);
        if (response !== agentDb) {
            emmitToastMessage.success('Fixed sucessfull', 'fixed for SNMP WALK');
            setAgentDb(response);
        } else {
            emmitToastMessage.error('It seems that nothing was fixed', 'Probably the file is not SNMP WALK');
        }
    }

    useEffect(() => {
        setLoadingFields(true);
        setName(selectedDevice.name);
        setPort(selectedDevice.port);
        setAgentDb(selectedDevice.agentDb);
        setLoadingFields(false);
    }, [selectedDevice])

    return (
        <Form>
            <Form.Group widths={"equal"}>
                <Form.Input disabled fluid label={"Device id"} value={selectedDevice.id} />
                <Form.Input loading={loadingFields} fluid label={"Name"} placeholder={"Device Name"}
                    value={name}
                    onChange={handlerName}
                />
                <Form.Input loading={loadingFields} fluid label={"Port"} placeholder={"Device Port"} type={"number"}
                    value={port}
                    onChange={handlerPort}
                />
            </Form.Group>
            <Form.Group>
                <TextArea loading={loadingFields} rows={20} placeholder={"SNMP walk or Agent DB"}
                    value={agentDb}
                    onChange={handlerAgentDb}
                />
            </Form.Group>
            <Button loading={loadingFields}
                floated={"right"}
                primary
                onClick={async (event) => submitFn(event)}
            >
                Update
            </Button>
            <Button
                loading={loadingFields} floated={"right"} color={"purple"}
                onClick={async (event) => { await actionFixAgent() }}
            >
                Fix Data base of Agent
            </Button>
        </Form>
    )
}

export default withDeviceConsumer(FormUpdateDevice);