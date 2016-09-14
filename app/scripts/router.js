import $ from 'jquery';
import Backbone from 'backbone';
import settings from './settings';

import contactsCollection from './collections/contactsCollection';
import session from './models/session';

import renderLogin from './views/login';
import renderSignup from './views/signup';
import renderHeader from './views/header';
import renderContacts from './views/contacts';
import createNew from './views/newContact';


const Router = Backbone.Router.extend({

routes : {
              login : 'loginFunction',
     'login/signup' : 'signupFunction',
        'contacts' : 'contactListFunction',
    'contacts/new' : 'newContactFunction',
    'contacts/:id' : 'indvContactFunction',
  // 'profile/:id'  : 'profileFunction',
              '/*'  : 'profileFunction'
},

loginFunction : function(){
    if (session.authtoken){
      console.log('user already exists!');
      router.navigate('contacts', {trigger:true});
    }
    let $login = renderLogin();
    $('.container').empty().append($login);
    // console.log('username is shannon');
    // console.log('password is password');
 },
 signupFunction : function(){
  let $login = renderLogin();
  let $signup = renderSignup();
  $('.container').empty().append($login).append($signup);
  $signup.find('.sub-signup-container').toggleClass('slidDownView');
},
contactListFunction : function(){
    let $header = renderHeader();
    let $contactList = renderContacts();
    $('.container').empty().append($header);

    contactsCollection.fetch({
      success: function(){
        let $contactList = renderContacts();
        $('.container').append($contactList);
      }
    });


},
newContactFunction : function(){
  let $header = renderHeader();
  let $contactForm = createNew();
  $('.container').empty().append($header).append($contactForm);
}

});

const router = new Router();

export default router;
