import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Button, Icon, Table } from 'semantic-ui-react';

class Report extends React.Component {
  resolveReport(docID) {
    console.log(`item to delete is: ${docID}`);
    this.props.Reports.collection.remove(docID);
  }

  render() {
    return (
        <Table.Row>
          <Table.Cell className="dateMargin" textAlign='center'>
            {this.props.report.createdAt.toLocaleDateString('en-US')}
          </Table.Cell>
          <Table.Cell textAlign='left'>{this.props.report.category}</Table.Cell>
          <Table.Cell textAlign='left'>{this.props.report.issue}</Table.Cell>
          <Table.Cell clsssName="deleteMargin" textAlign='center'>
            <Button icon onClick={() => this.resolveReport(this.props.report._id)} className="button-color">
              <Icon name='remove'/>
            </Button>
          </Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
Report.propTypes = {
  report: PropTypes.object.isRequired,
  Reports: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Report);
