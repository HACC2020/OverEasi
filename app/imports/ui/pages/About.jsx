import React from 'react';
import { Grid, Icon, Header } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class About extends React.Component {
  render() {
    return (
          <Grid container centered stackable columns={3}>

            <Grid.Column textAlign='center'>
              <Icon name='users' size='huge' inverted/>
              <Header as='h1' inverted>Multiple Users</Header>
              <Header as='h3' inverted>This address book allows any number of users to register and save their business contacts. You can only see the contacts that you have created.
              </Header>
            </Grid.Column>

            <Grid.Column textAlign='center'>
              <Icon name='file alternate' size='huge' inverted/>
              <Header as='h1' inverted>Contact Details</Header>
              <Header as='h3' inverted>For each contact you can save their name, address, and phone number.</Header>
            </Grid.Column>

            <Grid.Column textAlign='center'>
              <Icon name='calendar check' size='huge' inverted/>
              <Header as='h1' inverted>Timestamped Notes</Header>
              <Header as='h3' inverted>Each time you make contact with a contact, you can write a note that summarizes
                the conversation. This note is saved along with a timestamp and the contact.
              </Header>
            </Grid.Column>

          </Grid>
    );
  }
}

export default About;