import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Table } from 'semantic-ui-react';

class Report extends React.Component {
  render() {
    return (
        <Table.Row><Table.Cell textAlign='left'>{this.props.report.issue}</Table.Cell></Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
Report.propTypes = {
  report: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Report);
