import $ from 'jquery';
import Backbone from 'backbone';
import settings from './settings';
import router from './router';
import session from './Models/session'

$(document).ajaxSend(function (evt, xhrAjax, jqueryAjax) {
  console.log('intercepted');

  if (session.authtoken) {
    xhrAjax.setRequestHeader('Authorization', `Kinvey ${session.authtoken}`)
  } else {
    xhrAjax.setRequestHeader('Authorization', `Basic ${settings.basicAuth}`)
  }
});

if (window.sessionStorage.session) {
  session.username = JSON.parse(window.sessionStorage.session).username
  session.authtoken = JSON.parse(window.sessionStorage.session).authtoken
  }

Backbone.history.start();

if( !session.username ){
  router.navigate('login', {trigger:true});
}

console.log( settings );
