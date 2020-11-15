import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import App from '../../ui/layouts/App.jsx';
import { listIntents } from '../both/Methods';
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
  /*
  Meteor.call(addIntent, 'hello', ['training phrase', 'training', 'phrase'], ['message', 'message1'], (error) => {
    if (error) {
      console.log('error');
    } else {
      console.log('success');
    }
  });
   */
  /*

  */
  render(<App />, document.getElementById('root'));  // eslint-disable-line
});
