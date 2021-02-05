import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Table, Button } from "semantic-ui-react";
import FormApi from '../forms/FormApi';


const FooterApiTable = (props: any) => {
    const [isOpen, setDisplay] = useState(false);

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
                        onClick={() => props.history.push('/responses')}
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

export default withRouter(FooterApiTable);
