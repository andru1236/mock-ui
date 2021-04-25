import React, { useEffect, useState } from "react";
import { Input } from "semantic-ui-react";
import { withApiConsumer, ApiContextProps } from "../ApiContext";

const SearchApis = ({ apis, reloadApisWithFilter }: ApiContextProps) => {
  const [searchApis, filterApis] = useState([]);
  const [search, setSearch] = useState("");
  
  const searchHandler = () => {
    if (search === "") {
      filterApis([]);
      reloadApisWithFilter([]);
    } else {
      filterApis(apis.filter(api => api.name.includes(search)));
      reloadApisWithFilter(searchApis);
    }
  };

  const onKeyPressHandler = (ev) => {
    if (ev.key.toLowerCase() === "enter") {
      searchHandler();
    }
    if (ev.key === "") {
      setSearch("");
      searchHandler();
    }
  }

  const onBlurHandler = () => {
    if (search === "" || search === null) {
      searchHandler();
    }
  }

  const onChangeHandler = (ev: any, data) => {
    ev.preventDefault();
    setSearch(data.value);
  };

  useEffect(() => {
    if (searchApis.length > 0) {
      reloadApisWithFilter(searchApis);
    }
  }, [apis, search]);

  return (
    <div style={{display:"flex", justifyContent:"center", margin: "10px 0px"}}>
      <Input placeholder="Search API..." 
        value={search} 
        action={{
          icon: "search",
          onClick: () => searchHandler(),
        }}
        onBlur = {onBlurHandler}
        onKeyPress = {onKeyPressHandler}
        onChange={onChangeHandler} />
    </div>
  );
};

export default withApiConsumer(SearchApis);
