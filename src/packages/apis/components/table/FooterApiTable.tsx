import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Table, Button, Pagination } from "semantic-ui-react";
import FormApi from '../forms/FormApi';
import { withApiConsumer, ApiContextProps } from "../ApiContext";

const { REACT_APP_PAGE_LIMIT, REACT_APP_MAX_LIMIT } = process.env;
const PAGE_LIMIT = parseInt(REACT_APP_PAGE_LIMIT);
const MAX_NUM_LIMIT = parseInt(REACT_APP_MAX_LIMIT);
interface IViewProps extends ApiContextProps {
    history: any;
}

const FooterApiTable = ({ reloadApis, configPage, apisLength, setConfigPage, history }: IViewProps) => {
    const [isOpen, setDisplay] = useState(false);
    const [lastActivePage, setLastActivePage] = useState(configPage.active);
    const [numberPages, setNumberPages] = useState(configPage.active);

    const onPageChange = (e, pageInfo) => {
        e.preventDefault();
        if (typeof(pageInfo.activePage) === "number") {
            let next = ((pageInfo.activePage - 1) * PAGE_LIMIT);
            next = (next >= 0 && next < MAX_NUM_LIMIT) ? next : configPage.next;
            setConfigPage({ active:pageInfo.activePage, next:next });
        }
    };

    const getActivePage = () => {
        if (lastActivePage != configPage.active) {
            setLastActivePage(configPage.active);
            reloadApis();
        }

        return configPage.active;
    }

    useEffect(() => {
        let numPages = ((apisLength % PAGE_LIMIT) == 0) ? 
            apisLength / PAGE_LIMIT : 
            Math.round(apisLength / PAGE_LIMIT) + 1;
        setNumberPages(numPages);
        getActivePage();
    });

    const renderPaginationContent = () => {
        if (numberPages > 1) {
          return (
            <Table.Row>
                <Table.HeaderCell colSpan='5' style={{textAlign:"center"}}>
                    <Pagination 
                        activePage={getActivePage()}
                        onPageChange={onPageChange}
                        totalPages={numberPages}
                        ellipsisItem={null}
                    />
                </Table.HeaderCell>
            </Table.Row>
          );
        }
      };

    return (
        <Table.Footer fullWidth>
            <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell colSpan='4'>
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
