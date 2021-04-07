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

const FooterApiTable = ({ reloadApis, configPage, setConfigPage, history }: IViewProps) => {
    const [isOpen, setDisplay] = useState(false);
    const [lastActivePage, setLastActivePage] = useState(configPage.active);

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
            console.log(configPage);
            setLastActivePage(configPage.active);
            reloadApis();
        }

        return configPage.active;
    }

    useEffect(getActivePage);

    return (
        <Table.Footer fullWidth>
            <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell colSpan='3'>
                <Pagination 
                    activePage={getActivePage()}
                    onPageChange={onPageChange}
                    totalPages={5}
                    ellipsisItem={null}
                />
                </Table.HeaderCell>
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
        </Table.Footer>
    )
};

export default withApiConsumer(withRouter(FooterApiTable));
