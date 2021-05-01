import React, { useEffect, useState } from "react";
import {Table, Button, Pagination, Label} from "semantic-ui-react";

// Utils
import { calculatePageNumber, getStartAndEndIndex } from "../../../common/pagination_utils";

// HOCs
import { withRouter } from "react-router-dom";
import { withApiConsumer, ApiContextProps } from "../ApiContext";

// Components
import FormApi from '../forms/FormApi';
import ButtomFormCreateDevice from '../../../devices/components/forms/FormCreateDevice'


interface IViewProps extends ApiContextProps {
    history: any;
}

const FooterApiTable = ({ 
    apis,
    numberOfApisToShow,
    setApisToDisplay,
    history,
}: IViewProps) => {
    const [isOpen, setDisplay] = useState(false);
    const [totalApis, setTotalApis] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [activePage, setActivePage] = useState(1);

    const onPageChange = (e, pageInfo) => {
        e.preventDefault();
        if (typeof(pageInfo.activePage) === "number") {
            setActivePage(pageInfo.activePage);
            const [start, end] = getStartAndEndIndex(pageInfo.activePage, numberOfApisToShow);
            setApisToDisplay(apis.slice(start, end));
        }
    };

    useEffect(() => {
        setTotalPages(calculatePageNumber(apis.length, numberOfApisToShow));
    }, [apis, numberOfApisToShow]);

    useEffect(() =>{
        setTotalApis(apis.length);
        const [start, end] = getStartAndEndIndex(activePage, numberOfApisToShow);
        setApisToDisplay(apis.slice(start, end));
    }, [apis])

    const renderPaginationContent = () => {
      return (
        <Table.Row>
            <Table.HeaderCell colSpan='5' style={{textAlign:"center"}}>
                <Pagination
                    activePage={activePage}
                    onPageChange={onPageChange}
                    totalPages={totalPages}
                    ellipsisItem={null}
                />
            </Table.HeaderCell>
        </Table.Row>
      )};

    return (
        <Table.Footer fullWidth>
            <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell colSpan='4'>
                    <Label circular={true} color={'green'}> Total </Label>
                    <Label circular={true} color={'green'}>{totalApis}</Label>
                    
                    <Button
                        floated='right'
                        primary size='small'
                        onClick={() => setDisplay(true)}
                    >
                        Create new api
                    </Button>
                    <Button color={'purple'} floated={'right'} size={'small'}
                        onClick={() => history.push('/responses')}
                    >
                        Response Creator
                    </Button>

                    <FormApi isOpenModal={isOpen}
                        closeForm={() => setDisplay(false)}
                        action={'Create'}
                    />
                    <ButtomFormCreateDevice floated={"right"}/>
                </Table.HeaderCell>
            </Table.Row>
            {renderPaginationContent()}
        </Table.Footer>
    )
};

export default withApiConsumer(withRouter(FooterApiTable));
