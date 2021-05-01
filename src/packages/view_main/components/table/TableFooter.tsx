import React, { useEffect, useState } from "react";
import { Table, Button, Pagination, Label } from "semantic-ui-react";

// Utils
import { calculatePageNumber, getStartAndEndIndex } from "../../../common/pagination_utils";

// HOC's
import { withRouter } from "react-router-dom";
import { SearchContextProps, withSearchConsumer } from "../../SearchContext";

// Components
import FormApi from '../../../apis/components/forms/FormApi';
import ButtomFormCreateDevice from '../../../devices/components/forms/FormCreateDevice'

interface IViewProps extends SearchContextProps {
    history: any;
}

const TableFooter = ({
    entities,
    numberOfEntitiesToDisplay,
    setEntitiesToDisplay,
    history,
}: IViewProps) => {
    const [isOpenApiForm, setIsOpenApiForm] = useState(false);
    const [totalEntities, setTotalEntities] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [activePage, setActivePage] = useState(1);

    const onPageChange = (e, pageInfo) => {
        e.preventDefault();
        if (typeof (pageInfo.activePage) === "number") {
            setActivePage(pageInfo.activePage);
            const [start, end] = getStartAndEndIndex(pageInfo.activePage, numberOfEntitiesToDisplay);
            setEntitiesToDisplay(entities.slice(start, end));
        }
    };

    useEffect(() => {
        setTotalPages(calculatePageNumber(entities.length, numberOfEntitiesToDisplay));
    }, [entities, numberOfEntitiesToDisplay]);

    useEffect(() => {
        setTotalEntities(entities.length);
        const [start, end] = getStartAndEndIndex(activePage, numberOfEntitiesToDisplay);
        setEntitiesToDisplay(entities.slice(start, end));
    }, [entities])

    const renderPaginationContent = () => {
        return (
            <Table.Row>
                <Table.HeaderCell colSpan='5' style={{ textAlign: "center" }}>
                    <Pagination
                        activePage={activePage}
                        onPageChange={onPageChange}
                        totalPages={totalPages}
                        ellipsisItem={null}
                    />
                </Table.HeaderCell>
            </Table.Row>
        )
    };

    return (
        <Table.Footer fullWidth>
            <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell colSpan='4'>
                    <Label circular={true} color={'green'}> Total </Label>
                    <Label circular={true} color={'green'}>{totalEntities}</Label>

                    <Button
                        floated='right'
                        primary size='small'
                        onClick={() => setIsOpenApiForm(true)}
                    >
                        Create new api
                    </Button>

                    <ButtomFormCreateDevice floated={"right"} />

                    <Button color={'purple'} floated={'right'} size={'small'}
                        onClick={() => history.push('/responses')}
                    >
                        Response Creator
                    </Button>

                    <FormApi isOpenModal={isOpenApiForm}
                        closeForm={() => setIsOpenApiForm(false)}
                        action={'Create'}
                    />

                </Table.HeaderCell>
            </Table.Row>
            {renderPaginationContent()}
        </Table.Footer>
    )
};

export default withSearchConsumer(withRouter(TableFooter));
