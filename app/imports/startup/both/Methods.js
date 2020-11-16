import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { check } from 'meteor/check';
import { Promise } from 'meteor/promise';
import { Intents } from '../../api/intents/Intents';

const dialogflow = require('@google-cloud/dialogflow').v2;

/** Meteor functions:
 *
 *  listIntents: When called, requests Intents Data from API, updates Intents Collection with IntentName, Training Phrase, and Message.
 *  @param: none
 *
 *  addIntents: When called, requests to add Intent to API, updates Intents Collection.
 *  @param: displayName: String, rawPhrases: [String], messages: [String]
 *
 *  deleteIntents: When called, requests to remove Intent from API, updates Intents Collection.
 *  @param: intentPath: String (IntentsCollection item ID)
 *
 *  Note: If these functions are not in the same file IntentsCollection doesn't update correctly.
 */

const credentials = {
  project_id: Meteor.settings.project_id,
  private_key: Meteor.settings.private_key,
  client_email: Meteor.settings.client_email,
  api_key: Meteor.settings.private_key_id,
};
const listIntents = 'Intents.list';
const addIntent = 'Intents.add';
const deleteIntent = 'Intents.delete';

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
  },
});

Meteor.methods({
  'Intents.add'({ Intent, Phrases, Responses }) {
    const intentsClient = new dialogflow.IntentsClient({ credentials });
    const projectAgentPath = intentsClient.agentPath(credentials.project_id);
    const trainingPhrases = [];
    _.forEach(Phrases, (phrase) => {
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
      text: Responses,
    };
    const message = {
      text: messageText,
    };
    const intent = {
      displayName: Intent,
      trainingPhrases: trainingPhrases,
      messages: [message],
    };
    const createIntentRequest = {
      parent: projectAgentPath,
      intent: intent,
    };
    const [response] = Promise.await(intentsClient.createIntent(createIntentRequest));
    console.log(`Intent ${response.name} created`);
  },
});

Meteor.methods({
  'Intents.delete'(intentPath) {
    const intentsClient = new dialogflow.IntentsClient({ credentials });
    check(intentPath, String);
    const request = { name: intentPath };
    Promise.await(intentsClient.deleteIntent(request));
    console.log('Intent deleted');
  },
});

export { listIntents, addIntent, deleteIntent };
