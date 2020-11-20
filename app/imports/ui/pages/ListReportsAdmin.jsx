import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Table } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Report from '../components/Report';
import { Reports } from '../../api/report/Reports';

class ListReportsAdmin extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
    <div className="background">
    <Container>
      <Header as="h2" textAlign="center">List of Reports</Header>
      <Table celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell singleLine textAlign='center' collapsing>Report Created On</Table.HeaderCell>
            <Table.HeaderCell singleLine textAlign='center' collapsing>Category</Table.HeaderCell>
            <Table.HeaderCell singleLine textAlign='center'>Issues</Table.HeaderCell>
            <Table.HeaderCell textAlign='center' collapsing>Resolve Issue</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
              {this.props.reports.map((report) => <Report key={report.issues} report={report} Reports={Reports} />)}
        </Table.Body>
      </Table></Container>
    </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListReportsAdmin.propTypes = {
  reports: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Reports.adminPublicationName);
  return {
    reports: Reports.collection.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListReportsAdmin);
