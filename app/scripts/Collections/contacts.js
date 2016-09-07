import Backbone from 'backbone';
import Post from '../models/contactModel';
import settings from '../settings';

const Contacts = Backbone.Collection.extend({
  model: contact,
  url: `https://baas.kinvey.com/appdata/${ settings.appKey }/contacts`
});

let contacts = new Contacts();

export default contacts;
