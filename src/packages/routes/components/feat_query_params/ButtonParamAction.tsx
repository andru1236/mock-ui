import React, { useState } from "react";
import { Button, Grid, Label } from "semantic-ui-react";
import FormUpdateResponse from "../forms/FormUpdateResponse";
import { IParam } from "../../../../domain/api";

interface IViewProps {
    currentParam: IParam;
    submitUpdateResponse (response): any;
    deleteParam (): any;
}

const ButtonParamAction = ({ currentParam, submitUpdateResponse, deleteParam }: IViewProps) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <Grid>
          <Grid.Column textAlign="left">
              <Label as={ 'a' } color={ 'green' } onClick={ () => setIsOpen(true) }>Response</Label>
              <FormUpdateResponse
                isOpen={ isOpen }
                title={ currentParam.param }
                response={ currentParam.response }
                updateResponse={ submitUpdateResponse }
                deleteResponse={ deleteParam }
                close={ () => setIsOpen(false) }
              />
              <Button
                color={ 'red' } floated={ 'right' }
                circular icon={ 'delete' } size={ 'mini' }
                onClick={ deleteParam }
              />
          </Grid.Column>
      </Grid>
    )
}

export default ButtonParamAction;

