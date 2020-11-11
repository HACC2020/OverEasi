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
    const [response] = intentsClient.listIntents(request);
    response.forEach(intent => {
      console.log('====================');
      console.log(`Intent name: ${intent.name}`);
      console.log(`Intent display name: ${intent.displayName}`);
      console.log(`Action: ${intent.action}`);
      console.log(`Root folowup intent: ${intent.rootFollowupIntentName}`);
      console.log(`Parent followup intent: ${intent.parentFollowupIntentName}`);

      console.log('Input contexts:');
      intent.inputContextNames.forEach(inputContextName => {
        console.log(`\tName: ${inputContextName}`);
      });

      console.log('Output contexts:');
      intent.outputContexts.forEach(outputContext => {
        console.log(`\tName: ${outputContext.name}`);
      });
    });

    /*
    try {
      const result = HTTP.call('GET', `https://dialogflow.googleapis.com/v2/projects/eric-s-agjx/agent/intents?intentView=INTENT_VIEW_UNSPECIFIED&key=[${credentials.api_key}] HTTP/1.1`);
      return console.log(result);
    } catch (e) {
      return console.log('error');
    }
     */
  },
});

export { listIntents };
