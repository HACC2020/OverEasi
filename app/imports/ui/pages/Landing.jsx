import React from 'react';
import { Grid, Image, Container } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <Container>
        <Grid verticalAlign='middle' textAlign='center' container>

          <Grid.Column width={4}>
            <Image size='small' circular src="/images/meteor-logo.png"/>
          </Grid.Column>

          <Grid.Column width={8}>
            <h1>Welcome to this template</h1>
            <p>Now get to work and modify this app!</p>
          </Grid.Column>
        </Grid>
          <iframe
              allow="microphone;"
              width="100%"
              height="100%"
              style={{ border: 'none', right: 0 }}
              src="https://console.dialogflow.com/api-client/demo/embedded/6f01fc6a-c936-4682-b032-a71f7911e892">
          </iframe>
        </Container>
    );
  }
}

export default Landing;
