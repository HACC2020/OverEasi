import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Encapsulates state and variable values for this collection. */
class IntentsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'IntentsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      intent: String,
      phrase: {
        type: Array,
      },
      'phrase.$': {
        type: String,
      },
      message: {
        type: Array,
      },
      'message.$': {
        type: String,
      },
    }, { tracker: Tracker });
    // Ensure collection documents obey schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`; // IDK I think this needs to change
  }
}

export const Intents = new IntentsCollection();
