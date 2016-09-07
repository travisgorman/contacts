import Backbone from 'backbone'
import $ from 'jquery'
import router from '../router'
import Contact from '../Models/contactModel'
import contacts from '../collections/contacts'

function createNew(){
  let $newContact = $(`
  
    <main>
      <form class="form-new-contact">
        <input id="fullname" 
          type="text" 
          name="fullname" 
          placeholder="fullname">
        <input id="nickname"
          type="text"
          name="nickname"
          placeholder="nickname">
        <input id="email"
          type="text"
          name="email"
          placeholder="email">
        <input id="phone"
          type="text"
          name="phone"
          placeholder="phone">
        <button id="clear">clear</button>
        <button id="cancel">cancel</button>
        <button id="add-new">add new</button>
      </form>
    </main>  
  `)
  $newContact.find('#addnew').on('click', function(e){
    e.preventDefault();
    contacts.create({
      name: $newContact.find('input[name="fullname"]').val(),
      nickname: $newContact.find('input[name="nickname"]').val(),
      email: $newContact.find('input[name="email"]').val(),
      number: $newContact.find('input[name="phone"]').val()
    }, {
      success: function(response){
        router.navigate('contacts', {trigger:true});
      },
      error: function(){
        console.log( 'ERROR. you didn not create a new contact' );
      }
    });
  });

  $newContact.find('#clear').on('click', function(e){
    e.preventDefault();
    $('input[name="fullname"]').val('');
    $('input[name="nickname"]').val('');
    $('input[name="email"]').val('');
    $('input[name="phone"]').val('');
  });

  $newContact.find('#cancel').on('click', function(e){
    e.preventDefault();
    router.navigate('contacts', {trigger:true});
  });

  return $newContact;
}

export default createNew;
