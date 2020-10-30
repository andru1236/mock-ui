import React from "react";
import * as UIActions from '../../../reducers/uiActions';
import { connect } from "react-redux";
import { Table, Button } from "semantic-ui-react";

interface IViewProps {
  createApiModal(): void;
}

const FooterApiTable = (props: IViewProps) => (
  <Table.Footer fullWidth>
    <Table.Row>
      <Table.HeaderCell />
      <Table.HeaderCell colSpan='4'>
        <Button
          floated='right'
          primary size='small'
          onClick={() => props.createApiModal()}
        >
          Create new api
        </Button>
      </Table.HeaderCell>
    </Table.Row>
  </Table.Footer>
);


const mapDispatchTotProps = (dispatch: any) => {
  return {
    createApiModal: () => {
      dispatch(UIActions.openCreateApiModal())
    }
  }
};

export default connect(null, mapDispatchTotProps)(FooterApiTable);