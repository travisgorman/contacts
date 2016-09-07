import Backbone from 'backbone'
import $ from 'jquery'
import settings from './settings'
import session from './models/session'
import contacts from './collections/contacts'
import renderLogin from './views/login'
import renderSignup from './views/signup'
import renderHeader from './views/header'
import renderContacts from './views/contacts'
import createNew from './views/newContact'

const Router = Backbone.Router.extend({
  routes: {
    login          : 'loginFunction',
    'login/signup' : 'signupFunction',
    'contacts'     : 'showContactList',
    'contacts/new' : 'addNewContact',
    'contacts/:id' : 'individualContact'
  },
  //login
  loginFunction: () => {
    if (session.authtoken){
      console.log( 'user already exists' );
      router.navigate('contacts', {trigger:true});
    }
    let $login = renderLogin();
    $('.container').empty().append($login)
  },
  //signup
  signupFunction: () => {
    let $login = renderLogin();
    let $signup = renderSignup();
    $('.container').empty().append($login).append($signup)
    $signup.find('.sub-signup-container').toggleClass('slideDownView');
  },
  //showContactList
  showContactList: () => {
    let $header = renderHeader();
    let $contactList = renderContacts()
    $('.container').empty().append($header);
    contacts.fetch({
      success: function(){
        let $contactList = renderContacts();
        $('.container').append($contactList);
      }
    });
  },
  //newContact
  addNewContact: () => {
    let $header = renderHeader();
    let $contactForm = createNew();
    $('.container').empty().append($header).append($contactForm)
  }
});
const router = new Router();
export default router