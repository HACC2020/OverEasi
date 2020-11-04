import React from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class IntentsItem extends React.Component {
  removeItem(docID) {
    console.log(`item to delete is: ${docID}`);
    this.props.Intents.collection.remove(docID);
  }

  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.Intents.intent}</Table.Cell>
          <Table.Cell>{this.props.Intents.phrases}</Table.Cell>
          <Table.Cell>{this.props.Intents.response}</Table.Cell>
          <Table.Cell>
            <Link to={`/edit/${this.props.Intents._id}`}>Edit</Link>
          </Table.Cell>
          <Table.Cell>
            <Button icon onClick={() => this.removeItem(this.props.Intents._id)}>
              <Icon name='trash' />
            </Button>
          </Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
IntentsItem.propTypes = {
  stuff: PropTypes.object.isRequired,
  Intents: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(IntentsItem);
