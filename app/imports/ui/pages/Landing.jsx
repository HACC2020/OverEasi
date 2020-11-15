import React from 'react';
// import { Grid, Image } from 'semantic-ui-react';
import Chatbot from './Chatbot';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div className="background">
       <Chatbot/>
        </div>
    );
  }
}

export default Landing;
