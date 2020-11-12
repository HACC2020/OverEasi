import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Promise } from 'meteor/promise';
import { Intents } from '../../api/intents/Intents';

const dialogflow = require('@google-cloud/dialogflow').v2;

/** I have no idea if this works but it looks right :)
 *
 */

const credentials = {
  project_id: Meteor.settings.project_id,
  private_key: Meteor.settings.private_key,
  client_email: Meteor.settings.client_email,
  api_key: Meteor.settings.private_key_id,
};
const listIntents = 'Intents.list';

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

export { listIntents };
