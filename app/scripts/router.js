//dependencies
import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'underscore';

//models
import user from './Models/user';
import contact from './Models/contact-model';

//views (render functions)
import contactForm from './Views/add-new-contact';
import renderContacts from './Views/contact-list';
import renderContact from './Views/single-contact';

//views (elements)
import $login from '/Views/login';
import $signup from './Views/signup';
import $nav from './Views/nav';

//collections
import contactsCollection from './collections/contacts';

// router
const Router = Backbone.Router.extend({
  routes:{
    'login'        : 'loginFunction',
    'signup'       : 'signupFunction',
    'contacts'     : 'contactsFunction',
    'contacts/new' : 'newcontactFunction',
    'contacts/:id' : 'contactFunction',
    '/*'           : 'loginFunction'
  },

  loginFunction: function(){
    //empty the container and append the $login snippet
    $( '.container' )
      .empty()
        .append( $login );
  },

  signupFunction: function(){
    //empty the container and append the $signup snippet
    $( '.container' )
      .empty()
        .append( $signup );
  },

  contactsFunction: function(){
    // empty the container, and append the $nav and $contactList snippets
    // fetch the contactsCollection
    // pass in the headers object with the authorization ('Kinvey' + user.authtoken)
    contactsCollection.fetch({
      headers: {
        Authorization: 'Kinvey' + user authtoken
      }
    });
    let $contactList = renderContacts( contactsCollection );
    $( '.container' )
      .empty()
        .append( $nav )
          .append( $contactList );
  },

  contactFunction: function( id ) {
    //
    let contact;
    if ( contactsCollection.get( id ) ) {
      contact = contactsCollection.get( id );
    } else {
      contact = new contact({
        _id: id
      });
      contactsCollection.add( contact );
      contact.fetch();
    }
    //
    let $contactList = renderContacts( contactsCollection );
    let $contact = renderContacts( contact );
    
    $('.container').empty()
      .append( $nav )
        .append( $contactList )
          .append( $contact );
    //
    contact.on( 'change', function( model ) {
      let $contactList = renderContacts( contactsCollection );
      let $contact = renderContacts( model );
      if ( location.hash === '#contacts/' + id ){
      $( '.container' ).empty()
        .append( $nav )
          .append( $contactList )
            .append( $contact );
      }
    });
  },

  newContactFunction: function() {
    let $newContact = renderContactForm();
    //empty container and append $nav and $newContact
    $( '.container' )
      .empty()
        .append( $nav )
          .append( $newContact );
  }

});
// create an instance of router
const router = new Router();
// export router to ( global scope? ) so it can be used in entry.js runtime code.
export default router;
