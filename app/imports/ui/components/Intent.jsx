import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Table, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { _ } from 'meteor/underscore';
import { deleteIntent } from '../../startup/both/Methods';

/** Renders a single row in the List Stuff table. See pages/ListIntent.jsx. */
class Intent extends React.Component {
  async removeItem(docID) {
    console.log(`item to delete is: ${docID}`);
    this.props.Intents.collection.remove(docID);
    Meteor.call(deleteIntent, docID, (error) => {
      if (error) {
        console.log('error');
      } else {
        console.log('success');
      }
    });
  }

  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.intent.intent}</Table.Cell>
          <Table.Cell>{this.props.intent.phrase.map((entry, index) => <span key={index}><li>{entry}</li><br /></span>)}</Table.Cell>
          <Table.Cell>{this.props.intent.message.map((entry, index) => <span key={index}><li>{entry}</li><br /></span>)}</Table.Cell>
          <Table.Cell>
            <Button icon onClick={() => this.removeItem(this.props.intent._id)} className="button-color">
              <Icon name='trash'/>
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
