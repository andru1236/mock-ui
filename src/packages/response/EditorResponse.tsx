import React, { useState, Fragment } from "react";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";
import { Input, Form, Button, Grid, Segment } from "semantic-ui-react";

const EditorResponse = (params) => {
  const [value, setValue] = useState({});
  const check = (value) => {
    const { plainText, json, jsObject } = value;
    setValue(jsObject);
  };

  const algo = { something: "blablablablabl" };
  return (
    <Segment padded>
      <Form >
        <Form.Field>
          <label>Name of response</label>
          <Input placeholder={"User 1"} />
        </Form.Field>
        <Form.Field>
          <label>Json editor</label>
          <JSONInput
            id={"unique"}
            theme={"light_mitsuketa_tribute"}
            locale={locale}
            height={"400px"}
            width={"440px"}
            onChange={check}
            placeholder={algo}
          />
        </Form.Field>
        <Grid>
          <Grid.Column textAlign={"right"}>
            <Button primary> Save </Button>
            <Button primary> Save as </Button>
          </Grid.Column>
        </Grid>
      </Form>
    </Segment>
  );
};

export default EditorResponse;
