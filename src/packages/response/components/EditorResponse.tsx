import React, { useState, useEffect } from "react";
import { Input, Form, Button, Grid, Segment } from "semantic-ui-react";
// Third library
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";
import FormExportResponseJson from "./forms/FormExportResponseJson"
//import writeJsonFile from "write-json-file";

import { createAResponse, updateResponse } from '../sources';
import emmitToastMessage from "../../common/emmitToastMessage";
import { withResponseConsumer, ResponseContextProps } from '../ResponseContext'
import AlertConfirmation from './AlertConfirmation';
import { IResponse } from "../../../domain/response";

const exampleJson = {
  field_1: "field_1",
  list_1: [1, 2, 3],
  object_1: { field_2: 'field_2' }
};

const EditorResponse = ({ selectedResponse, unSelectResponse, removeResponse, reloadResponses, exportResponseAsJson }: ResponseContextProps) => {
  const [editorValue, setEditorValue] = useState(exampleJson);
  const [name, setName] = useState("");
  const [openRemoveResponse, setOpenRevemoResponse] = useState(false);
  const [openExport, setOpenExportJson] = useState(false);

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

  const saveAs = () => {
    if (_validationFields()) {
      const newResponse: IResponse = { name: name, response: editorValue };
      createAResponse(newResponse);
      _reset();
      // TODO: Double reload why?
      reloadResponses();
      reloadResponses();
    }
  }

  const save = () => {
    if (_validationFields() && selectedResponse._id !== "") {
      const newResponse: IResponse = { _id:selectedResponse._id, name: name, response: editorValue };
      updateResponse(newResponse);
      // TODO: Double reload why?
      reloadResponses();
      reloadResponses();
    } else {
      emmitToastMessage.warning(
        'No exists the response',
        'The response should be exist to update, save, or Override'
      )
    }
  }

  const exportResponseJson = async (fileName:any) => {
    if (_validationFields() && selectedResponse._id !== "") {
      exportResponseAsJson(fileName, editorValue);
      emmitToastMessage.success('Export JSON', 'Export response as JSON file successfully.');
    } else {
      emmitToastMessage.warning(
        'No exists the response',
        'The response should be exist to export as JSON.'
      )
    }
  };

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

        <Form.Field>
          <label>Json editor</label>
          <div style={{width: "100%", border:"solid 1px #DDD", borderRadius:"3px"}}>
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
        <Grid style={{ width: "100%" }}>

          <Grid.Column textAlign={"left"} style={{ width: "45%" }}>
            <Button negative onClick={() => setOpenRevemoResponse(true)}> Remove </Button>
            <Button color={'orange'} onClick={() => _reset()}> Reset </Button>
          </Grid.Column>

          <Grid.Column textAlign={"right"} style={{ width: "55%" }}>
            <Button primary onClick={() => save()}> Save </Button>
            <Button primary onClick={() => saveAs()}> Save as </Button>
            <Button color={'green'} onClick={ () => setOpenExportJson(true) }> Export JSON </Button>
          </Grid.Column>

        </Grid>
      </Form>

      <AlertConfirmation
        callback={() => {removeResponse(); _reset()}}
        closeForm={() => setOpenRevemoResponse(false)}
        open={openRemoveResponse}
        title={'Delete response'}
        content={'The action will be remove the response and you will not able to restore the Response'}
      />

      <FormExportResponseJson
        isOpen={ openExport }
        response={ editorValue }
        title={ selectedResponse.name }
        close={ () => setOpenExportJson(false) }
        exportResponseAsJson={ exportResponseJson }
      />
    </Segment>
  );
};

export default withResponseConsumer(EditorResponse);
