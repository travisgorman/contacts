import $ from 'jquery';

function renderContact( contact ) {
  let $contact = $(`

    <div class="contact">
      <article class="contact-content">
        <h4>${contact.get( 'name' )}</h2>
        <p>
          ${contact.get( 'nickname' )}
        </p>
        <p>
          ${contact.get( 'number' )}
        </p>
        <p>
          ${contact.get( 'email' )}
        </p>

      </article>
    </div>

  `);

return $contact;

}
export default renderContact;
