import React, { createContext, useState, useEffect } from 'react';
import { IDevice } from '../../../domain/device';
import emmitToastMessage from '../../common/emmitToastMessage';
import { getAllDevices } from '../sources/gql';


const nullFn = (...args) => {
};
const aSyncNullFn = (...args) => {
    return new Promise(nullFn)
};
const blankDevice: IDevice = {
    id: "",
    name: "",
    port: 0,
    isRunning: false,
    agentDb: ""
}


export interface DeviceContextProps {
    devices: IDevice[];
    setDevices(devices: IDevice[]): void;
    selectedDevice: IDevice;
    setSelectedDevice(device: IDevice): void;
    selectDevice(deviceId: string): void;
    reloadDevices(): any;

}


const DeviceContext = createContext<DeviceContextProps>({
    devices: [],
    setDevices: nullFn,
    setSelectedDevice: nullFn,
    selectedDevice: blankDevice,
    selectDevice: nullFn,
    reloadDevices: nullFn
});


export const DeviceProvider = (props: any) => {
    const [devices, setDevices] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState(blankDevice);

    const reloadDevices = () => {
        getAllDevices()
            .then(res => {
                setDevices(res);
            }).catch(err => {
                emmitToastMessage.error('Error to reload Devices', "");
            });
    }

    const reloadDevicesAsyn = async () => {
        try {
            const devicesFromServer = await getAllDevices();
            setDevices(devicesFromServer);
        } catch (error) {
            emmitToastMessage.error('Error to reload Devices', "");
        }
    }

    const selectDevice = (deviceId: string) => {
        setSelectedDevice(devices.find(device => device.id === deviceId));
    }

    useEffect(() => {
        reloadDevices();
    }, [])

    return (
        <DeviceContext.Provider
            value={{
                devices: devices,
                setDevices: setDevices,
                selectedDevice: selectedDevice,
                setSelectedDevice,
                selectDevice: selectDevice,
                reloadDevices: reloadDevicesAsyn,
            }}
        >
            {props.children}
        </DeviceContext.Provider>
    )
}

export const DeviceConsumer = DeviceContext.Consumer;

export const withDeviceConsumer = WrappedComponent => props => {
    return (
        <DeviceConsumer>
            {context => {
                return (
                    <WrappedComponent {...props} {...context} />
                )
            }}
        </DeviceConsumer>
    )
}