import React from "react";
import { withRouter } from "react-router-dom";

import { Button, Grid, Message } from "semantic-ui-react";
import { withPathConsumer, PathContextProps } from "./PathContext";

interface IViewProps extends PathContextProps {
    history: any;
    match: any;
}

const ButtonGoToViewApi = ({ history, selectedApi }: IViewProps) => {
    return (
      <Grid columns={ 'equal' }>
          <Grid.Column style={ { display: 'flex', alignItems: 'center' } }>
              <Button size={ 'large' } circular primary icon={ 'arrow left' } onClick={ () => history.push('/') }/>
          </Grid.Column>
          <Grid.Column width={ 7 }>
              <Message size={ 'mini' } color='green' header={ 'API: ' } content={ selectedApi.name }/>
          </Grid.Column>
          <Grid.Column width={ 7 }>
              <Message size={ 'mini' } color='blue' header={ 'Port: ' } content={ selectedApi.port }/>
          </Grid.Column>
      </Grid>
    )
}

export default withRouter(withPathConsumer(ButtonGoToViewApi));
