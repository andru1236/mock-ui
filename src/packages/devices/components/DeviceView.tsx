import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Container, Divider, Dimmer, Loader } from "semantic-ui-react";
import HeaderMain from "../../common/HeaderMain";
import ButtonGoToMainView from "./ButtonGoToMainView";
import { DeviceProvider, withDeviceConsumer, DeviceContextProps } from "./DeviceContext";
import { getOneDevice } from "../sources/gql";
import emmitToastMessage from "../../common/emmitToastMessage";
import FormUpdateDevice from "./forms/FormUpdateDevice";

interface IViewProps extends DeviceContextProps {
    match: any
}


const _LoaderDeviceView = ({ match, setSelectedDevice, selectedDevice, reloadDevices }: IViewProps) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        async function loadDeviceFn() {
            try {
                await reloadDevices();
                const deviceBasedOnParam = await getOneDevice(match.params.deviceId);
                setSelectedDevice(deviceBasedOnParam);
                setIsLoading(false)
            } catch (error) {
                emmitToastMessage.error(
                    "Error loading device",
                    `Error in device [${match.param?.deviceId}]`
                )
            }
        }

        if (selectedDevice.id === "") {
            loadDeviceFn();
        }
    }, []);

    return (
        <>
            {isLoading
                ? <Dimmer active={isLoading} inverted={true}>
                    <Loader inverted={true}>Loading</Loader>
                </Dimmer>
                :
                <>
                    <HeaderMain section={"Device"} />
                    <Divider />
                    <Container textAlign='justified'>
                        <ButtonGoToMainView />
                        <Divider />
                        <FormUpdateDevice />
                    </Container>
                </>
            }
        </>
    )

}

const LoaderDeviceView = withDeviceConsumer(withRouter(_LoaderDeviceView));


const DeviceView = () => {


    return (
        <DeviceProvider>
            <LoaderDeviceView />
        </DeviceProvider>
    )
}


export default DeviceView;