import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { check } from 'meteor/check';
import { Promise } from 'meteor/promise';

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
    };
    const [response] = Promise.await(intentsClient.listIntents(request));
    console.log(response);
  },
});

export { listIntents };
