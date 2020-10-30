import { Meteor } from 'meteor/meteor';
import { Sessions } from '../../api/sessions/Sessions';

const dialogflow = require('@google-cloud/dialogflow').v2;

/** Bruh moment
 * Need to figure out how to make sessionClient accessible to all functions
 *
 */

const credentials = {
  project_id: Meteor.settings.project_id,
  private_key: Meteor.settings.private_key,
  client_email: Meteor.settings.client_email,
};

export async function createSession(sessionId) {
  // Create a new session
  const sessionClient = new dialogflow.SessionsClient({ credentials });
  const sessionPath = sessionClient.projectAgentSessionPath(credentials.project_id, sessionId);
  console.log(sessionId);
}

export async function queryBot(sessionId, query) {
  const sessionClient = Sessions.collection.find(sessionId);
  const response = sessionClient.detectIntent(
      credentials.project_id,
      sessionId,
      query,
      'en-US',
  );
  console.log('Detected intent');
  const result = response[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log(' No intent matched. ');
  }
}
