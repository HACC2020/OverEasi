import React from 'react';
import { Container, Header, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Report extends React.Component {
  render() {
    return (
        <Container>
          <Header as="h2" textAlign="center">List of Reports</Header>
          <Table celled padded>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell singleLine textAlign='center'>Issues</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell textAlign='center'>{this.props.report.issue}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table></Container>
    );
  }
}

/** Require a document to be passed to this component. */
Report.propTypes = {
  report: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Report);
