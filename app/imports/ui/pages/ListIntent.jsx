import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Container, Header, Table } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Intents } from '../../api/intents/Intents';
import Intent from '../components/Intent';
import { listIntents } from '../../startup/both/Methods';

/** Renders the Page for adding a document. */
class ListIntent extends React.Component {
  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    Meteor.call(listIntents, (error) => {
      if (error) {
        console.log('error');
      } else {
        console.log('success');
      }
    });
    return (
        <Container>
          <Header as="h2" textAlign="center">List Intents</Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Intent Name</Table.HeaderCell>
                <Table.HeaderCell>Training Phrases</Table.HeaderCell>
                <Table.HeaderCell>Response</Table.HeaderCell>
                <Table.HeaderCell>Delete</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.intents.map((intent, index) => <Intent
                  key={index}
                  intent={intent}
                  Intents={Intents}/>)}
            </Table.Body>
          </Table>
        </Container>
    );
  }
}

/** Require an array of intent documents in the props. */
ListIntent.propTypes = {
  intents: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to intent documents.
  const subscription = Meteor.subscribe(Intents.userPublicationName);
  return {
    intents: Intents.collection.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListIntent);
