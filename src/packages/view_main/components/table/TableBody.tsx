import React, { Fragment, useState } from "react";
import { Table, Checkbox, Button } from "semantic-ui-react";
// Domain
import { IApiInstance } from "../../../../domain/api";
import { IDevice } from "../../../../domain/device";

// Souces
import { startApi, stopApi } from "../../../apis/sources/gql";
import { startDeviceSimulation, stopDeviceSimulation } from "../../../devices/sources/gql";

// HOCs
import { withRouter } from "react-router-dom";
import { withSearchConsumer, SearchContextProps } from "../../SearchContext";
import { withApiConsumer, ApiContextProps } from "../../../apis/components/ApiContext";

// Components
import emmitToastMessage from "../../../common/emmitToastMessage";
// API Components
import ConfirmRemoveApi from '../../../apis/components/forms/ConfirmRemoveApi';
import FormApi from '../../../apis/components/forms/FormApi';
import ConfirmCloneApi from '../../../apis/components/forms/ConfirmCloneApi';
// Device Components
import ConfirmRemoveDevice from "../../../devices/components/forms/ConfirmRemoveDevice";


const blankDevice: IDevice = { id: "", port: 0, isRunning: false, name: "", agentDb: null };

interface IViewProps extends SearchContextProps, ApiContextProps {
    history: any;
}


const BodyTable = ({ entitiesToDisplay, reloadEntities, selectApi, history }: IViewProps) => {
    const [isOpenDeleteApi, setIsOpenDeleteApi] = useState(false);
    const [isOpenUpdateApi, setIsOpenUpdateApi] = useState(false);
    const [isOpenCloneApi, setIsOpenCloneApi] = useState(false);

    const [isOpenDeleteDevice, setIsOpenDeleteDevice] = useState(false);
    const [_selectedDevice, _setSelectedDevice] = useState(blankDevice)

    const startOrStopApi = async (isNotRunning, api) => {
        if (isNotRunning) {
            await startApi(api._id);
        } else {
            await stopApi(api._id);
            emmitToastMessage.warning('Stop api instance', `The api instance with port ${api.port} was stopped`);
        }
        await reloadEntities();
    }

    const startOrStopDeviceSimulation = async (isNotRunning, device) => {
        if (isNotRunning) {
            const response = await startDeviceSimulation(device.id);
        } else {
            await stopDeviceSimulation(device.id);
            emmitToastMessage.warning('Stop api instance', `The api instance with port ${device.port} was stopped`);
        }
        await reloadEntities();
    }


    const ApiRow = (api: IApiInstance) => {
        return (
            <Table.Row key={api._id} positive={api.settings.enabled} negative={api.routes.length === 0}>
                <Table.Cell collapsing>
                    <Checkbox checked={api.settings.enabled} slider
                        onClick={(event, data) => startOrStopApi(data.checked, api)}
                    />
                </Table.Cell>
                <Table.Cell>{api.name}</Table.Cell>
                <Table.Cell>{api.port}</Table.Cell>
                <Table.Cell>{api.routes.length} </Table.Cell>

                <Table.Cell>
                    <Button basic size={'tiny'} color={'green'} onClick={() => {
                        selectApi(api._id);
                        history.push(`/apis/${api._id}/routes`);
                    }}>
                        {"Routes"}
                    </Button>
                    <Button basic size={'tiny'} color={'blue'} onClick={() => {
                        selectApi(api._id);
                        setIsOpenUpdateApi(true);
                    }}>
                        {"Update Api"}
                    </Button>
                    <Button basic size={'tiny'} color={'red'} onClick={() => {
                        selectApi(api._id);
                        setIsOpenDeleteApi(true);
                    }}>
                        {"Remove"}
                    </Button>
                    <Button basic size={'tiny'} color={'orange'} onClick={() => {
                        selectApi(api._id);
                        setIsOpenCloneApi(true);
                    }}>
                        {"Clone Api"}
                    </Button>
                </Table.Cell>
            </Table.Row>

        )
    }

    const DeviceRow = (device: IDevice) => {
        return (
            <Table.Row key={device.id} positive={device.isRunning}>
                <Table.Cell collapsing>
                    <Checkbox checked={device.isRunning} slider
                        onClick={(event, data) => startOrStopDeviceSimulation(data.checked, device)}
                    />
                </Table.Cell>
                <Table.Cell>{device.name}</Table.Cell>
                <Table.Cell>{device.port}</Table.Cell>
                <Table.Cell>{"------"} </Table.Cell>

                <Table.Cell>
                    <Button basic size={'tiny'} color={'blue'} onClick={() => {
                        history.push(`/devices/${device.id}`);
                    }}>
                        {"Configure Device"}
                    </Button>

                    <Button basic size={'tiny'} color={'red'} onClick={() => {
                        _setSelectedDevice(device)
                        setIsOpenDeleteDevice(true);
                    }}>
                        {"Remove Device"}
                    </Button>
                </Table.Cell>
            </Table.Row>
        )
    }

    return (
        <Fragment>
            <Table.Body>
                {
                    entitiesToDisplay.map((entity: IApiInstance | IDevice) => {
                        if ("_id" in entity) {
                            return ApiRow(entity);
                        }
                        if ("id" in entity) {
                            return DeviceRow(entity);
                        }
                    })
                }

            </Table.Body>

            {/* Forms */}
            <ConfirmRemoveApi
                isOpenModal={isOpenDeleteApi}
                closeForm={() => setIsOpenDeleteApi(false)}
            />

            <FormApi
                isOpenModal={isOpenUpdateApi}
                closeForm={() => setIsOpenUpdateApi(false)}
                action={'Update'}
            />

            <ConfirmCloneApi
                isOpenModal={isOpenCloneApi}
                closeForm={() => setIsOpenCloneApi(false)}
            />
            {/*  Device Forms  */}
            <ConfirmRemoveDevice
                open={isOpenDeleteDevice}
                closeForm={() => setIsOpenDeleteDevice(false)}
                device={_selectedDevice}
            />

        </Fragment>

    )
};

export default withApiConsumer(withSearchConsumer(withRouter(BodyTable)));
