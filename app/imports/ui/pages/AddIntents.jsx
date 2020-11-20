import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, ListField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Intents } from '../../api/intents/Intents';
import { addIntent } from '../../startup/both/Methods';

/** Create a schema to specify the structure of the data to appear in the form. */
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

/** Renders the Page for adding a document. */
class AddStuff extends React.Component {

  /** On submit, insert the data. */
  async submit(data, formRef) {
    const { Intent, Phrases, Responses } = data;
    Meteor.call(addIntent, data, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Item added successfully', 'success');
        Intents.collection.insert({ Intent, Phrases, Responses });
      }
    });
    formRef.reset();
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Add Intent </Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)}>
              <Segment>
                <TextField name='Intent'/>
                <ListField name="Phrases"/>
                <ListField name="Responses"/>
                <SubmitField value='Submit' className="button-color"/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default AddStuff;
