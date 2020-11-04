import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import App from '../../ui/layouts/App.jsx';
import { createSessionMethod } from '../both/Methods';

// const uuid = require('uuid');
/** Startup the application by rendering the App layout component. */
Meteor.startup(() => {
    // this.userId = uuid.v4();
    // Move this meteor call later. Hopefully moving it fixes everything :)
    Meteor.call(createSessionMethod, '1234', (error) => {
      if (error) {
        console.log('error');
      } else {
        console.log('success');
      }
    });
    /*
    Meteor.call(queryBotMethod, 'hello', (error) => {
      if (error) {
        console.log('error');
      } else {
        console.log('success');
      }
    });
    */
  render(<App />, document.getElementById('root'));  // eslint-disable-line
});
