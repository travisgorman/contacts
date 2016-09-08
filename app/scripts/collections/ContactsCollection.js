import $ from 'jquery';
import Backbone from 'backbone';
import settings from '../settings';
import Contact from '../models/contactModel';

const Contacts = Backbone.Collection.extend({
  model: Contact,
  url: `https://baas.kinvey.com/appdata/${settings.appKey}/contacts`
});

let contactsCollection = new Contacts();

export default contactsCollection;
