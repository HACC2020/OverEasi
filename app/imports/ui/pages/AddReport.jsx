import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField, LongTextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Reports } from '../../api/report/Reports';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  fullName: String,
  email: String,
  zipcode: Number,
  issue: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddReport extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { fullName, email, zipcode, issue } = data;
    const owner = Meteor.admin().username;
    Reports.collection.insert({ fullName, email, zipcode, issue, owner },
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
                <TextField name='fullName'/>
                <TextField name='email'/>
                <TextField name='zipcode'/>
                <LongTextField name='issue'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default AddReport;
