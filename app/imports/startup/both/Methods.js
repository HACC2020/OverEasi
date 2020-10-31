import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Intents } from '../../api/intents/Intents';
import { Messages } from '../../api/messages/Messages';
import { createSession, queryBot } from './DialogFlowFunctions';
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
const createSessionMethod = 'Session.make';
const queryBotMethod = 'Query.bot';

Meteor.methods({
  'Session.make'(sessionID) {
    check(sessionID, String);
    const sessionClient = new dialogflow.SessionsClient({ credentials });
    const sessionPath = sessionClient.projectAgentSessionPath(credentials.project_id, sessionID);
    console.log('wassup');
    // createSession(sessionID);
  },
});
/*
Meteor.methods({
  'Query.bot'(sessionID, query) {
    check(sessionID, String);
    check(query, String);
    queryBot(sessionID, query);
  },
});
*/
export { createSessionMethod, queryBotMethod };
