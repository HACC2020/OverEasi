import React from 'react';
import { Form, Button, Container, Header } from 'semantic-ui-react';

/** Renders the Page for adding a document. */
class AddIntentMockup extends React.Component {
  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (
        <Container>
          <div className="background-2">
          <Header as="h2" textAlign="center">Add Intents</Header>
          <Form>
          <Form.Field>
            <label>Intent Name</label>
            <input placeholder='Intent Name'/>
          </Form.Field>
          <Form.Field>
            <label>Training Phrase</label>
            <input placeholder='Training Phrase'/>
          </Form.Field>
          <Form.Field>
            <label>Response</label>
            <input placeholder='Response'/>
          </Form.Field>
          <Button type='submit'>Submit</Button>
        </Form>
          </div>
        </Container>
    );
  }
}

export default AddIntentMockup;
