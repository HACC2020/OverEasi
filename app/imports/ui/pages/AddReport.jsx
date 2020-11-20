import React from 'react';
import { Grid, Segment, Header, Divider } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, HiddenField, TextField, LongTextField, SelectField } from 'uniforms-semantic';
import swal from 'sweetalert';
//import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Reports } from '../../api/report/Reports';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  fullName: { type: String, optional: true },
  email: { type: String, optional: true },
  issue: String,
  createdAt: Date,
  category: {
    type: String,
    allowedValues: ['General Feedback', 'Invalid Information', 'Syntactic Error', 'System Malfunction', 'Other'],
    defaultValue: 'General Feedback',
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddReport extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { email, issue, createdAt, category } = data;
    Reports.collection.insert({ email, issue, createdAt, category },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Report submitted successfully', 'success');
          formRef.reset();
        }
      });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Report a Problem</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <SelectField name='category'/>
                <LongTextField name='issue'/>
                <Divider horizontal>Optional</Divider>
              <TextField name='email'/>
                <HiddenField name='createdAt' value={new Date().getTime()}/>
                <SubmitField value='Submit' className="button-color"/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default AddReport;
