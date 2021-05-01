import React, { useState } from "react";
import { Input } from "semantic-ui-react";
import { withSearchConsumer, SearchContextProps } from "../SearchContext";

const SearchEntities = ({ entities, setEntities, setEntitiesToDisplay, reloadEntities }: SearchContextProps) => {
    const [search, setSearch] = useState("");

    const searchHandler = () => {
        if (search === "") {
            reloadEntities();
        } else {
            const filteredApis = entities.filter(entity => entity.name.includes(search));
            setEntities(filteredApis);
            setEntitiesToDisplay(filteredApis);
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

    return (
        <div style={{ display: "flex", justifyContent: "center", margin: "10px 0px" }}>
            <Input placeholder="Search API..."
                value={search}
                action={{
                    icon: "search",
                    onClick: () => searchHandler(),
                }}
                onBlur={onBlurHandler}
                onKeyPress={onKeyPressHandler}
                onChange={onChangeHandler} />
        </div>
    );
};

export default withSearchConsumer(SearchEntities);
