import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { check } from 'meteor/check';
import { Promise } from 'meteor/promise';
import { Intents } from '../../api/intents/Intents';

const dialogflow = require('@google-cloud/dialogflow').v2;

/** Meteor functions:
 *  listIntents: When called, requests Intents Data from API, updates Intents Collection with IntentName, Training Phrase, and Message.
 *  addIntents: When called, requests to add Intent to API, updates Intents Collection.
 *  To Add:
 *  deleteIntents: When called, requests to remove Intent from API, updates Intents Collection.
 *  editIntents: When called, requests to edit Intent from API, updates Intents Collection.
 */

const credentials = {
  project_id: Meteor.settings.project_id,
  private_key: Meteor.settings.private_key,
  client_email: Meteor.settings.client_email,
  api_key: Meteor.settings.private_key_id,
};
const listIntents = 'Intents.list';
const addIntent = 'Intents.add';

Meteor.methods({
  'Intents.list'() {
    const intentsClient = new dialogflow.IntentsClient({ credentials });
    const projectAgentPath = intentsClient.agentPath(credentials.project_id);
    const request = {
      parent: projectAgentPath,
      intentView: 'INTENT_VIEW_FULL',
    };
    const [response] = Promise.await(intentsClient.listIntents(request));
    _.forEach(response, (entry) => Intents.collection.update(entry.name,
        { $set: { intent: entry.displayName,
        phrase: _.map(entry.trainingPhrases, (entry2) => entry2.parts[0].text),
        message: entry.messages[0].text.text } },
        { upsert: true },
        (error) => (error ?
            console.log('error adding') :
            console.log('added successfully'))));
    /*
    console.log(_.map(response, (entry) => entry.displayName));
    */
  },
});

Meteor.methods({
  'Intents.add'(displayName, rawPhrases, messages) {
    const intentsClient = new dialogflow.IntentsClient({ credentials });
    check(displayName, String);
    check(rawPhrases, Array);
    check(messages, Array);
    const projectAgentPath = intentsClient.agentPath(credentials.project_id);
    const trainingPhrases = [];
    _.forEach(rawPhrases, (phrase) => {
      const part = {
        text: phrase,
      };
      const trainingPhrase = {
        type: 'EXAMPLE',
        parts: [part],
      };
      trainingPhrases.push(trainingPhrase);
    });
    const messageText = {
      text: messages,
    };
    const message = {
      text: messageText,
    };
    const intent = {
      displayName: displayName,
      trainingPhrases: trainingPhrases,
      messages: [message],
    };
    const createIntentRequest = {
      parent: projectAgentPath,
      intent: intent,
    };
    const [response] = Promise.await(intentsClient.createIntent(createIntentRequest));
    console.log(`Intent ${response.name} created`);
    /*
    console.log(_.map(response, (entry) => entry.displayName));
    */
  },
});

export { listIntents, addIntent };
