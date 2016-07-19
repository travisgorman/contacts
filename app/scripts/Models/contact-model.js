import Backbone from 'backbone';
import settings from '../settings';

const Contact = Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot: `https://baas.kinvey.com/appdata/${settings.appId}/contacts`,
  defaults: {
    name: '';
    nickname: '';
    number:
  }
});

window.Post = Post;

export default Post;
