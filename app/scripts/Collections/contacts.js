import Backbone from 'backbone';
import Post from '../models/contact-model';
import settings from '../settings';

const Contacts = Backbone.Collection.extend({
  model: contact,
  url: `https://baas.kinvey.com/appdata/${ settings.appId }/contacts`
});

let contactsCollection = new Contacts();

export default contactsCollection;
