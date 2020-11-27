import React from "react";
import { withRouter } from "react-router-dom";

import { Button, Grid } from "semantic-ui-react";
import { IApiInstance } from "../../../domain/api";
import { withPathConsumer } from "./PathContext";

interface IViewProps {
    history: any;
    match: any;
    selectedApi: IApiInstance;
}

const GoToApiButton = (props: IViewProps) => {
    return (
        <Grid>
            <Grid.Row>
                <Button labelPosition='left' icon='left chevron' size='mini'
                        content={ `API: ${ props.selectedApi.name }   |  PORT:  ${ props.selectedApi.port }` }
                        onClick={ () => props.history.push('/') }
                />
            </Grid.Row>
        </Grid>
    )
}

export default withRouter(withPathConsumer(GoToApiButton));
