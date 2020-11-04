import React from 'react';
import { Segment, Container } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Messages } from '../../api/messages/Messages';
import Chatbox from '../components/Chatbox';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  message: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class MessageBox extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { message } = data;
    Messages.collection.insert({ message },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    return (
        <Container>
          <Segment>
            Welcome to Chatbox!
            {this.props.messages.map((message) => <Chatbox key={message._id} stuff={message} Messages={Messages}/>)}
          </Segment>
          <AutoForm ref={ref => {
            fRef = ref;
          }} schema={bridge} onSubmit={data => this.submit(data, fRef)}>
            <Segment>
              <TextField name='message'/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Container>
    );
  }
}

MessageBox.propTypes = {
  messages: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Messages.userPublicationName);
  return {
    messages: Messages.collection.find({}).fetch(),
    ready: subscription.ready(),
  };
})(MessageBox);
