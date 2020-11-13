import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import App from '../../ui/layouts/App.jsx';
import { listIntents, addIntent, deleteIntent } from '../both/Methods';
// const uuid = require('uuid');
/** Startup the application by rendering the App layout component. */
Meteor.startup(() => {
    // this.userId = uuid.v4();
  Meteor.call(listIntents, (error) => {
    if (error) {
      console.log('error');
    } else {
      console.log('success');
    }
  });
  Meteor.call(addIntent, 'hello', ['training phrase', 'training', 'phrase'], ['message', 'message1'], (error) => {
    if (error) {
      console.log('error');
    } else {
      console.log('success');
    }
  });
  /*
  Meteor.call(deleteIntent, 'projects/eric-s-agjx/agent/intents/4fe5e94d-851a-4e0f-b38e-b24a02ef7519', (error) => {
    if (error) {
      console.log('error');
    } else {
      console.log('success');
    }
  });
  */
  render(<App />, document.getElementById('root'));  // eslint-disable-line
});
