import React from 'react';
import Chatbot from './Chatbot';
import WelcomeModal from './WelcomeModal';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div>
       <WelcomeModal/>
       <Chatbot/>
        </div>
    );
  }
}

export default Landing;
