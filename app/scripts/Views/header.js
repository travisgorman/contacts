import $ from 'jquery';
import Backbone from 'backbone';
import router from '../router';
import settings from '../settings';
import session from '../models/session';
import renderLogin from './login';

function renderHeader(){
  let $header = $(`
    <header>
      <section>
        <button>Logout</button>
      </section>
      <nav>
        <ul>
          <li id="your-contacts"> Your Contacts </li>
          <li id="add-new"> Add New </li>
          <li id="logout"> Logout </li>
        </ul>
      </nav>
    </header>
    `);

    $header.find('li').on('click', function(evt){
      evt.preventDefault();
      if ($(this).attr('id') === 'your-contacts'){
        router.navigate('contacts', {trigger:true});
      } else if ($(this).attr('id') === 'add-new') {
        router.navigate('contacts/new', {trigger:true});
      } else {
        // why ??? curious...
        // the logout button in header logs out on single click
        // yet here, as nav>ul>li, it requires a double-click
        $header.find('#logout').on('click',function(){
          $.ajax({
            type: 'POST',
            url: `https://baas.kinvey.com/user/${settings.appKey}/_logout`,
            headers: {
              Authorization: `Kinvey ${session.authtoken}`
            },
            contentType: 'application/json',
            success: function(response){
              sessionStorage.removeItem('session');
              delete session.authtoken;
              router.navigate('login', {trigger:true});
              console.log('You logged out!');
            },
            error: function(){
              console.log('ERROR! You did not log out. Check header.js and storageSession');
            }
          });
        });
      }
    });

    $header.find('button').on('click',function(){
      $.ajax({
        type: 'POST',
        url: `https://baas.kinvey.com/user/${settings.appKey}/_logout`,
        headers: {
          Authorization: `Kinvey ${session.authtoken}`
        },
        contentType: 'application/json',
        success: function(response){
          sessionStorage.removeItem('session');
          delete session.authtoken;
          router.navigate('login', {trigger:true});
          console.log('You logged out!');
        },
        error: function(){
          console.log('Error! You failed to logout! Check header.js');
        }
      });
    });




  return $header;
}

export default renderHeader;
