import React from "react";
import {Table, Button} from "semantic-ui-react";

interface IViewProps {
  openModal(): void
}

const FooterApiList = (props: IViewProps) => (
  <Table.Footer fullWidth>
    <Table.Row>
      <Table.HeaderCell/>
      <Table.HeaderCell colSpan='4'>
        <Button
          floated='right'
          primary size='small'
          onClick={() => props.openModal()}
        >
          Create new api
        </Button>
      </Table.HeaderCell>
    </Table.Row>
  </Table.Footer>
);

export default FooterApiList;