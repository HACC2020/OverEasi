import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Messages } from '../../api/messages/Messages';
import { Reports } from '../../api/report/Reports';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
}

/** Initialize the collection if empty. */
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

/** Initialize the database with a default data document. */
function addMessages(data) {
  Messages.collection.insert(data);
}

/** Initialize the collection if empty. */
if (Messages.collection.find().count() === 0) {
  if (Meteor.settings.defaultMessages) {
    console.log('Creating default data.');
    Meteor.settings.defaultMessages.map(data => addMessages(data));
  }
}

/** Add Report */
function addReport(data) {
  console.log('Adding report');
  Reports.collection.insert(data);
}

if (Reports.collection.find().count() === 0) {
  if (Meteor.settings.defaultReports) {
    console.log('Creating default data.');
    Meteor.settings.defaultReports.map(data => addReport(data));
  }
}
