import Backbone from 'backbone'
import $ from 'jquery'
import router from '../router'
import contacts from '../collections/contacts'
import Contact from '../Models/contactModel'

function renderContacts(){
  let $contactsPage = $(`
    <div id="contacts">
      <main>
        <ul class="ul-contact-list">
        </ul>
      </main>
    </div>
  `);

  function renderSingleContact(contact){
    console.log( contact );
    let $contactLi = $(`
      <li class="test">
        <h3 class="contact-title">${contact.get('name')}</h3>
        <div className="div-dropdown">
          <ul class="ul-dropdown">
            <li class="contact-nickname">${contact.get('nickname')}</li>
            <li>${contact.get('email')}</li>
            <li>${contact.get('number')}</li>
          </ul>
        </div>
      </li>
    `);

    $contactsPage.find('.ul-contact-list').append($contactLi);
    $contactLis.find('h3').on('click', function(e){
      e.preventDefault();
      $contactLi.toggleClass('show-dropdownView');
    });
  }

  contacts.on('add', renderSingleContact);
  contacts.forEach(renderSingleContact);
  return $contactsPage;
}

export default renderContacts;
