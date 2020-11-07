import React from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class IntentItem extends React.Component {
  removeItem(docID) {
    console.log(`item to delete is: ${docID}`);
    this.props.Intents.collection.remove(docID);
  }

  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.intents.intent}</Table.Cell>
          <Table.Cell>{this.props.intents.phrases}</Table.Cell>
          <Table.Cell>{this.props.intents.response}</Table.Cell>
          <Table.Cell>
            <Link to={`/edit/${this.props.intents._id}`}>Edit</Link>
          </Table.Cell>
          <Table.Cell>
            <Button icon onClick={() => this.removeItem(this.props.intents._id)}>
              <Icon name='trash' />
            </Button>
          </Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
IntentItem.propTypes = {
  intents: PropTypes.object.isRequired,
  Intents: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(IntentItem);
