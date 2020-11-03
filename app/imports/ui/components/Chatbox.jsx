import React from 'react';
import { Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
class Chatbox extends React.Component {
  render() {
    return (
        <Message>
          {this.props.messages.message}
        </Message>
    );
  }
}

/** Require a document to be passed to this component. */
Chatbox.propTypes = {
  messages: PropTypes.object.isRequired,
  Messages: PropTypes.object.isRequired,
};

export default withRouter(Chatbox);
