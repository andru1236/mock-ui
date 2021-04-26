import React, { useState, useEffect } from "react";
import { Input, Form, Button, Grid, Segment } from "semantic-ui-react";
// Domain
import { IResponse } from "../../../domain/response";

// Sources
import { removeAResponse, createAResponse, updateResponse } from "../sources/gql"

// Third library
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";

// HOCs
import { withResponseConsumer, ResponseContextProps } from '../ResponseContext'

// Components
import emmitToastMessage from "../../common/emmitToastMessage";
import AlertConfirmation from './AlertConfirmation';


const exampleJson = {
  field_1: "field_1",
  list_1: [1, 2, 3],
  object_1: { field_2: 'field_2' }
};

const EditorResponse = ({ selectedResponse, unSelectResponse, reloadResponses }: ResponseContextProps) => {
  const [editorValue, setEditorValue] = useState(exampleJson);
  const [name, setName] = useState("");
  const [openRemoveResponse, setOpenRemoveResponse] = useState(false);

  const editorHandler = (value) => {
    // const { plainText, json, jsObject } = value;
    const { jsObject } = value;
    setEditorValue(jsObject);
  };

  const handlerName = (event: any) => setName(String(event.target.value));

  const _validationFields = () => {
    if (name === "" || editorValue === undefined) {
      emmitToastMessage.warning(
        'Fields invalids',
        'The name should be no blank and the response should be a valid JSON'
      )
      return false;
    }

    return true;
  }

  const _reset = () => {
    setEditorValue(exampleJson); 
    setName(""); 
    unSelectResponse();
  }

  const removeResponse = async () => {
    selectedResponse._id !== "" ?
        await removeAResponse(selectedResponse._id)
        : emmitToastMessage.error('Response no exists', 'First Save the response');
    reloadResponses();
  };

  const saveAs = async () => {
    if (_validationFields()) {
      const newResponse: IResponse = { name: name, response: editorValue };
      await createAResponse(newResponse);
      _reset();
      reloadResponses();
    }
  }

  const save = async () => {
    if (_validationFields() && selectedResponse._id !== "") {
      const newResponse: IResponse = { _id:selectedResponse._id, name: name, response: editorValue };
      await updateResponse(newResponse);
      reloadResponses();
    } else {
      emmitToastMessage.warning(
        'No exists the response',
        'The response should be exist to update, save, or Override'
      )
    }
  }

  const downloadResponseAsJSON = async () => {
    if (_validationFields()){
      const fileName = name + ".json";
      const json = JSON.stringify(editorValue);
      const blob = new Blob([json],{type:'application/json'});
      const href = await URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = href;
      link.download = fileName + ".json";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  useEffect(() => {
    if (selectedResponse._id !== "") {
      setEditorValue(selectedResponse.response);
      setName(selectedResponse.name);
    } else {
      setName("");
      setEditorValue(exampleJson);
    }
  }, [selectedResponse]);

  return (
    <Segment padded>
      <Form >

        <Form.Field>
          <label>Name of response</label>
          <Input placeholder={"User 1"} value={name} onChange={handlerName} />
        </Form.Field>

        <Form.Field className="editor-content">
          <label>Json editor</label>
          <div className="json-editor">
            <JSONInput
              id={"unique"}
              theme={"light_mitsuketa_tribute"}
              locale={locale}
              height={"450px"}
              onChange={editorHandler}
              placeholder={editorValue}
            />
          </div>
        </Form.Field>

        {/* Action Buttons */}
        <Grid className="btn-editor-content">

          <Grid.Column className="left-buttons">
            <Button negative onClick={() => setOpenRemoveResponse(true)}> Remove </Button>
            <Button color={'orange'} onClick={() => _reset()}> Reset </Button>
          </Grid.Column>

          <Grid.Column className="right-buttons">
            <Button primary onClick={() => save()}> Save </Button>
            <Button primary onClick={() => saveAs()}> Save as </Button>
            <Button color={'green'} onClick={ downloadResponseAsJSON }> Export JSON </Button>
          </Grid.Column>

        </Grid>
      </Form>

      <AlertConfirmation
        callback={async () => { await removeResponse(); _reset()}}
        closeForm={() => setOpenRemoveResponse(false)}
        open={openRemoveResponse}
        title={'Delete response'}
        content={'The action will be remove the response and you will not able to restore the Response'}
      />
    </Segment>
  );
};

export default withResponseConsumer(EditorResponse);
