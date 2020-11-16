import React from 'react';
import { Button, Header, Image, Modal } from 'semantic-ui-react';

function welcomeModal() {
  const [open, setOpen] = React.useState(true);

  return (
      <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
      >
        <Modal.Header>Welcome to OverEasi COVID-19 Chatbot!</Modal.Header>
        <Modal.Content image>
          <Image size='big' src='images/tutorial.png' floated='left'/>
          <Modal.Description>
            <Header>Tutorial on our chatbot</Header>
            <p>
              Need valuable information about COVID-19? Our chatbot has all the information about COVID-19 that
              you have in mind. Simply type in a question and our chatbot will help you pull up
              relevant data to meet your expectations.
            </p>
            <p>Some example questions would be:<br/><br/>
              <i>&quot;What are the symptoms of Covid-19?&quot;</i><br/>
              <i>&quot;Where are the nearest testing centers?&quot;</i><br/>
            </p>
            <p>Go on and say hi to our friendly chatbot to start a conversation!</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
              content="Let's get chatting"
              labelPosition='right'
              icon='angle double right'
              onClick={() => setOpen(false)}
              positive
          />
        </Modal.Actions>
      </Modal>
  );
}

export default welcomeModal;
