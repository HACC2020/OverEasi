import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, HiddenField, SubmitField, TextField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Intents } from '../../api/intents/Intents';
import { editIntent } from '../../startup/both/Methods';

const formSchema = new SimpleSchema({
  Intent: String,
  Phrases: {
    type: Array,
    minCount: 1,
    maxCount: 10,
  },
  'Phrases.$': {
    type: String,
  },
  Responses: {
    type: Array,
    minCount: 1,
    maxCount: 10,
  },
  'Responses.$': {
    type: String,
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for editing a single document. */
class EditIntents extends React.Component {

  /** On successful submit, insert the data. */
  async submit(data, formRef) {
    const { Intent, Phrases, Responses } = data;
    Meteor.call(editIntent, data, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Item edited successfully', 'success');
        Intents.collection.insert({ Intent, Phrases, Responses });
      }
    });
    formRef.reset();
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Edit Stuff</Header>
            <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
              <Segment>
                <TextField name='intent'/>
                <TextField name='phrases'/>
                <TextField name='response'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
                <HiddenField name='owner' />
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
EditIntents.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Intents.userPublicationName);
  return {
    doc: Intents.collection.findOne(documentId),
    ready: subscription.ready(),
  };
})(EditIntents);
