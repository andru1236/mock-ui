import React from "react";
import { withRouter } from "react-router-dom";

import { Button, Grid } from "semantic-ui-react";
import { withPathConsumer, PathContextProps } from "./PathContext";

interface IViewProps extends PathContextProps {
    history: any;
    match: any;
}

const GoToApiButton = ({ history, selectedApi }: IViewProps) => {
    return (
      <Grid>
          <Grid.Row>
              <Button labelPosition='left' icon='left chevron' size='mini'
                      content={ `API: ${ selectedApi.name }   |  PORT:  ${ selectedApi.port }` }
                      onClick={ () => history.push('/') }
              />
          </Grid.Row>
      </Grid>
    )
}

export default withRouter(withPathConsumer(GoToApiButton));
