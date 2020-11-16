import React from 'react';
import { Container, Icon, Segment, Button, Dropdown } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

/** Render a Not Found page if the user enters a URL that doesn't match any route. */
class Chatbot extends React.Component {
  render() {
    const spacing = { paddingTop: '10px' };
    return (
        <Container style={ spacing } textAlign='left'>
            <Button as={NavLink} exact to="/addreport" className="button-color" >
              <Button.Content>
                <Icon name='exclamation triangle'/> Report a problem
              </Button.Content>
            </Button>
            <Button className="button-color">
              <Button.Content>
                <Icon name='phone'/>
                <Dropdown text='Support' pointing="top left">
                  <Dropdown.Menu>
                    <Dropdown.Item text="Department of Health: (808) 586-4400" disabled="true"/>
                    <Dropdown.Item text="Disease Reporting Line: (808) 586-4586" disabled="true"/>
                  </Dropdown.Menu>
                </Dropdown>
              </Button.Content>
            </Button>
            <Segment inverted color='black'>
            <iframe
                allow="microphone;"
                width="100%"
                height="700px"
                style={{ border: 'none' }}
                src="https://console.dialogflow.com/api-client/demo/embedded/6f01fc6a-c936-4682-b032-a71f7911e892">
            </iframe>
          </Segment>
        </Container>
    );
  }
}

export default Chatbot;
