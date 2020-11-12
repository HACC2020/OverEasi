import React from 'react';
import { Button, Container, Header, Icon, Table } from 'semantic-ui-react';

/** Renders the Page for adding a document. */
class ListIntentMockup extends React.Component {
  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (

        <Container>
          <Header as="h2" textAlign="center">List Intents</Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Intent Name</Table.HeaderCell>
                <Table.HeaderCell>Training Phrases</Table.HeaderCell>
                <Table.HeaderCell>Response</Table.HeaderCell>
                <Table.HeaderCell>Edit</Table.HeaderCell>
                <Table.HeaderCell>Delete</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Intent 1</Table.Cell>
                <Table.Cell>Testing Center</Table.Cell>
                <Table.Cell>Located at Tripler Army Medical Center</Table.Cell>
                <Table.Cell>Edit</Table.Cell>
                <Table.Cell><Icon name='trash' /></Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Intent 2</Table.Cell>
                <Table.Cell>Quarantine length</Table.Cell>
                <Table.Cell>You must quarantine for two weeks.</Table.Cell>
                <Table.Cell>Edit</Table.Cell>
                <Table.Cell><Icon name='trash' /></Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Container>
    );
  }
}

export default ListIntentMockup;
