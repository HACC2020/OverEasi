import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Messages } from '../../api/messages/Messages.js';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
}

function addMessages(data) {
  console.log(`  Adding: ${data.sessionId} `);
  Messages.collection.insert(data);
}

/** Initialize the collection if empty. */
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

if (Messages.collection.find().count() === 0) {
  if (Meteor.settings.defaultMessages) {
    console.log('Creating default messages.');
    Meteor.settings.defaultMessages.map(data => addMessages(data));
  }
}
