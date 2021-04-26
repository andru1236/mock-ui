import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import {Table, Button, Pagination, Label} from "semantic-ui-react";
import FormApi from '../forms/FormApi';
import { withApiConsumer, ApiContextProps } from "../ApiContext";


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
    const [pagesNumber, setPageNumber] = useState(1);
    const [activePage, setActivePage] = useState(1);

    const getStartAndEndIndex = (_activePage, _numberOfApisToShow) => {
        // Special case
        if (_activePage === 1) {
            return [0, _numberOfApisToShow];
        }
        const startIndex = (_numberOfApisToShow * (_activePage -1));
        const endIndex = startIndex  + _numberOfApisToShow;
        return [startIndex, endIndex];
    }

    const calculatePageNumber = (apis, numberOfApisToShow) => {
        const totalApis = apis.length;
        const numberOfPages: number = parseInt(totalApis) / parseInt(numberOfApisToShow);

        // @ts-ignore
        if (parseInt(numberOfPages) === 0) {
            return 1;
        }

        // @ts-ignore
        if (parseInt(numberOfPages) < numberOfPages){
            // @ts-ignore
            return parseInt(numberOfPages) + 1;
        }

        // @ts-ignore
        return parseInt(numberOfPages);
    };

    const onPageChange = (e, pageInfo) => {
        e.preventDefault();
        if (typeof(pageInfo.activePage) === "number") {
            setActivePage(pageInfo.activePage);
            const [start, end] = getStartAndEndIndex(pageInfo.activePage, numberOfApisToShow);
            setApisToDisplay(apis.slice(start, end));
        }
    };

    useEffect(() => {
        setPageNumber(
            calculatePageNumber(apis, numberOfApisToShow)
        );
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
                    totalPages={pagesNumber}
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
                </Table.HeaderCell>
            </Table.Row>
            {renderPaginationContent()}
        </Table.Footer>
    )
};

export default withApiConsumer(withRouter(FooterApiTable));
