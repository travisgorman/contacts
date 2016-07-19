import $ from 'jquery';
import contactsCollection from '../collections/contacts';
import router from '../router';

import user from '../models/username';

function contactForm() {
    let $newContact = $(`
    <div class="contact-form">
      <h2>Write a new contact</h2>
      <form>
        <input type="text" name="title" class="new-contact-name" placeholder="Full Name">
        <input type="text" name="title" class="new-contact-number" placeholder="Phone Number">
        <input type="text" name="title" class="new-contact-nickname" placeholder="Nickname">
        <input type="text" name="title" class="new-contact-email" placeholder="Email">
        <input type="submit" name="submit" value="submit">
      </form>
    </div>
  `);

    $newContact.find( 'input[type="submit"]' ).on( 'click', function( evt ) {
        evt.preventDefault();

        contactsCollection.create({
            author: user.username,
            name: $( '.new-contact-name' ).val(),
            nickname: $( '.new-contact-nickname' ).val(),
            number: $( '.new-contact-number' ).val(),
            email: $( '.new-contact-email' ).val(),
        }, {
            success: function( response ) {
                router.navigate( 'contacts', { trigger: true });
            },

            error: function() {
              console.log( 'you musta goof\'d.' );

            }
        });

    });

    return $newContact;
}
export default contactForm;
