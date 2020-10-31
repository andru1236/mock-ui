import React from "react";
import { Table, Button } from "semantic-ui-react";
import ApiForm from '../forms/ApiForm';
import withApiActions, { withApiActionsProps } from '../withApiActions';
import withIsOpen, { withIsOpenProps } from '../../common/withIsOpen';

interface incomingProps extends withApiActionsProps, withIsOpenProps { };

const FooterApiTable = (props: incomingProps) => {
  return (
    <Table.Footer fullWidth>
      <Table.Row>
        <Table.HeaderCell />
        <Table.HeaderCell colSpan='4'>
          <Button
            floated='right'
            primary size='small'
            onClick={props.isOpenTrue}
          >
            Create new api
          </Button>
          <ApiForm isOpenModal={props.isOpen} closeForm={props.isOpenFalse} submitFunction={props.createApi} />
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  )
};

export default withApiActions(withIsOpen(FooterApiTable));
