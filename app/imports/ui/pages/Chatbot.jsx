import React from 'react';

/** Render a Not Found page if the user enters a URL that doesn't match any route. */
class Chatbot extends React.Component {
  render() {
    return (
        <iframe
            allow="microphone;"
            width="100%"
            height="700px"
            style={{ border: 'none' }}
            src="https://console.dialogflow.com/api-client/demo/embedded/6f01fc6a-c936-4682-b032-a71f7911e892">
        </iframe>
    );
  }
}

export default Chatbot;
