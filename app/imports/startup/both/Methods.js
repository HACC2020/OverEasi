import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';
import { Promise } from 'meteor/promise';
import { Messages } from '../../api/messages/Messages';

const dialogflow = require('@google-cloud/dialogflow').v2;

/** I have no idea if this works but it looks right :)
 *
 */

const credentials = {
  project_id: Meteor.settings.project_id,
  private_key: Meteor.settings.private_key,
  client_email: Meteor.settings.client_email,
};
const createSessionMethod = 'Session.make';
// const queryBotMethod = 'Query.bot';

Meteor.methods({
  'Session.make'(sessionID) {
    check(sessionID, String);
    const sessionClient = new dialogflow.SessionsClient({ credentials });
    const sessionPath = sessionClient.projectAgentSessionPath(credentials.project_id, sessionID);
    const query = _.pluck(Messages.collection.find({ sessionId: sessionID }).fetch(), 'message');
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: query,
          languageCode: 'en-US',
        },
      },
    };
    const responses = Promise.await(sessionClient.detectIntent(request));
    console.log('Detected intent');
    console.log(responses);
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
    if (result.intent) {
      console.log(`  Intent: ${result.intent.displayName}`);
    } else {
      console.log(' No intent matched. ');
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

export { createSessionMethod };
