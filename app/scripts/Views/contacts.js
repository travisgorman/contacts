import $ from 'jquery';
import Backbone from 'backbone';

import router from '../router';
import contactsCollection from '../collections/contactsCollection';
import Contact from '../models/contactModel';

function renderContacts() {
  let $contactsPage = $(`
    <div id="contacts">
      <main>
        <ul class="ul-contact-list">
        </ul>
      </main>
    </div>
    `);

 function renderSingleContact(contact){
   console.log(contact);
   let $contactLi = $(`
     <li class="test">
       <h3 class="contact-title">
        ${contact.get('fullname')}
      </h3>
       <div class="div-dropdown">
          <ul class="ul-dropdown">
            <li class="contact-nickname">
              ${contact.get('nickname')}
            </li>
            <li>
              ${contact.get('email')}
            </li>
            <li>
              ${contact.get('phone')}
            </li>
          </ul>
       </div>
     </li>
     `);
     $contactsPage.find('.ul-contact-list').append($contactLi);
     $contactLi.find('h3').on('click', function(evt){
       evt.preventDefault();
       $contactLi.toggleClass('show-dropdownView');
     });
 }


    contactsCollection.on('add', renderSingleContact);
    contactsCollection.forEach(renderSingleContact);

    return $contactsPage;
}


export default renderContacts;
