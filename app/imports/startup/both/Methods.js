import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Intents } from '../../api/intents/Intents';
import { Messages } from '../../api/messages/Messages';
import { createSession, queryBot } from './DialogFlowFunctions';

const createSessionMethod = 'Session.make';
const queryBotMethod = 'Query.bot';

Meteor.methods({
  'Session.make'(sessionID) {
    check(sessionID, String);
    createSession(sessionID);
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
