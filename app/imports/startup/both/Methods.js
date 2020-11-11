import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { HTTP } from 'meteor/http';

const dialogflow = require('@google-cloud/dialogflow').v2;

/** I have no idea if this works but it looks right :)
 *
 */

const credentials = {
  project_id: Meteor.settings.project_id,
  private_key: Meteor.settings.private_key,
  client_email: Meteor.settings.client_email,
};
const listIntents = 'Intents.list';
// const queryBotMethod = 'Query.bot';

Meteor.methods({
  'Intents.list'() {
    try {
      const result = HTTP.call('GET', 'https://dialogflow.googleapis.com/v2/projects/eric-s-agjx/agent/intents');
      return console.log(result);
    } catch (e) {
      return console.log('error');
    }
  },
});
/*
Meteor.methods({
  'Query.bot'(request, sessionClient) {
    return sessionClient.detectIntent(request);
  },
});
 */

export { listIntents };
