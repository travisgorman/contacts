import $ from 'jquery';

function renderContacts(contactsCollection) {
    let $contactList = $(`

    <div class="contact-list">
      <h2>contacts</h2>
      <ul> </ul>
    </div>

  `);

    function renderSingleContact( contact ) {
        let $contactItem = $(`

          <li class="contact-list-item">
            <h3 class="name">

            </h3>
            <p class="nickname">

            </p>
            <p class="number">

            </p>
            <p class="email">

            </p>
          </li>
        `);

        $contactList.find( 'ul' ).append( $contactItem );

    }
    contactsCollection.on( 'add', renderSingleContact );

    contactsCollection.forEach( renderSingleContact );

    return $contactList;
}

export default renderContacts;
