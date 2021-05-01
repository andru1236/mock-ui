import React from "react";
import { withRouter } from "react-router-dom";

import { Button, Grid, Message } from "semantic-ui-react";
import { withDeviceConsumer, DeviceContextProps } from "./DeviceContext";

interface IViewProps extends DeviceContextProps{
    history: any;
    match: any;
}

const ButtonGoToMainView = ({ history, selectedDevice }: IViewProps) => {
    return (
        <Grid columns={ 'equal' }>
            <Grid.Column style={ { display: 'flex', alignItems: 'center' } }>
                <Button size={ 'large' } circular primary icon={ 'arrow left' } onClick={ () => history.push('/') }/>
            </Grid.Column>
            <Grid.Column width={ 7 }>
                <Message size={ 'mini' } color='green' header={ 'Device: ' } content={ selectedDevice.name }/>
            </Grid.Column>
            <Grid.Column width={ 7 }>
                <Message size={ 'mini' } color='blue' header={ 'Port: ' } content={ selectedDevice.port }/>
            </Grid.Column>
        </Grid>
    )
}

export default withRouter(withDeviceConsumer(ButtonGoToMainView));
