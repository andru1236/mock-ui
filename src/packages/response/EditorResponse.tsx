import React, { useState } from "react";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";

const EditorResponse = (params) => {
  const [value, setValue] = useState({});
  const check = (value) => {
    const { plainText, json, jsObject } = value;
    setValue(jsObject);
  };

  const algo = { something: "blablablablabl" };
  return (
    <div>
      <JSONInput
        id={"unique"}
        theme={"dark_vscode_tribute"}
        locale={locale}
        height={"500px"}
        width={"650px"}
        onChange={check}
        placeholder={algo}
      />
    </div>
  );
};

export default EditorResponse;
