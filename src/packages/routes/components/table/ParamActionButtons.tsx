import React, { useState } from "react";
import { Button, Grid, Label } from "semantic-ui-react";
import UpdateResponseForm from "../forms/UpdateResponseForm";
import { IPath, IResource } from "../../../../domain/api";

interface IViewProps {
    path: IPath;
    resource: IResource;
    submitUpdateResponse (response): any;
    deleteParam (): any;
}

const ParamActionButtons = (props: IViewProps) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <Grid>
          <Grid.Column textAlign="left">
              <Label as={ 'a' } color={ 'green' } onClick={ () => setIsOpen(true) }>Response</Label>
              <UpdateResponseForm
                isOpen={ isOpen }
                path={ props.path.path }
                currentResource={ props.resource }
                updateResponse={ props.submitUpdateResponse }
                deleteResponse={ props.deleteParam }
                close={ () => setIsOpen(false) }
              />
              <Button
                color={ 'red' } floated={ 'right' }
                circular icon='delete' size='mini'
                onClick={ props.deleteParam }
              />
          </Grid.Column>
      </Grid>
    )
}

export default ParamActionButtons;

