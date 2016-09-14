import $ from 'jquery';
import Backbone from 'backbone';

import router from '../router';
import Contact from '../models/contactModel';
import contactsCollection from '../collections/contactsCollection';

function createNew() {
    let $newContact = $(`
    <main>
    	<form class="form-new-contact" >
    		<input id="fullname"
          type="text"
          name="fullname"
          placeholder="fullname" >
    		<input id="#nickname" 
          type="text"
          name="nickname"
          placeholder="nickname" >
    		<input id="email"
          type="text"
          name="email"
          placeholder="email" >
    		<input id="phone"
          type="text"
          name="phone"
          placeholder="phone" >
        <button id="clear">
          clear
        </button>
        <button id="cancel">
          cancel
        </button>
        <button id="add-new">
          add new
        </button>
    	</form>
    </main>
      `);
    $newContact.find('#add-new').on('click', function(evt) {
        console.log($newContact.find('input[name="fullname"]').val());
        evt.preventDefault();
        contactsCollection.create({
            fullname: $newContact.find('input[name="fullname"]').val(),
            nickname: $newContact.find('input[name="nickname"]').val(),
            email: $newContact.find('input[name="email"]').val(),
            phone: $newContact.find('input[name="phone"]').val()
        }, {
            success: function(response) {
                router.navigate('contacts', {
                    trigger: true
                });
            },
            error: function() {
                console.log('Error creating new contact. See newContact.js');
            }
        });
    });

    $newContact.find('#clear').on('click', function(evt) {
      evt.preventDefault();
      $('input[name="fullname"]').val('');
      $('input[name="nickname"]').val('');
      $('input[name="email"]').val('');
      $('input[name="phone"]').val('');
    });

    $newContact.find('#cancel').on('click', function(evt) {
      evt.preventDefault();
      router.navigate('contacts', {trigger:true});
    });

    return $newContact;
}


export default createNew;
