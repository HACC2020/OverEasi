import React from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Intents } from '../../api/intents/Intents';

/** Renders a single row in the List Stuff table. See pages/ListIntent.jsx. */
class Intent extends React.Component {
    removeItem(docID) {
    console.log(`item to delete is: ${docID}`);
    this.props.Intents.collection.remove(docID);
  }

  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.intent.intent}</Table.Cell>
          <Table.Cell>{this.props.intent.phrase}</Table.Cell>
          <Table.Cell>{this.props.intent.message}</Table.Cell>
          <Table.Cell>
            <Link to={`/edit/${this.props.intent._id}`}>Edit</Link>
          </Table.Cell>
          <Table.Cell>
            <Button icon onClick={() => this.removeItem(this.props.intent._id)}>
              <Icon name='trash' />
            </Button>
          </Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
Intent.propTypes = {
  intent: PropTypes.object.isRequired,
  Intents: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Intent);
