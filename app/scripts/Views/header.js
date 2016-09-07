import Backbone from 'backbone'
import $ from 'jquery'
import settings from '../settings'
import router from '../router'
import session from '../Models/session'
import renderLogin from './login'

function renderHeader(){
  let $header = $(`
  
    <header>
      <section>
        <h2>Your Contacts</h2>
        <button>Logout</button>
      </section>
      <nav className="nav-main">
        <ul class="ul-nav">
          <li id="contacts-link">Contacts</li>
          <li id="create-new-link">Create New</li>
          <li id="settings">Settings</li>
        </ul>
      </nav>
    </header>  
  `);

  $header.find('li').on('click', function(e){
    e.preventDefault()
    if (this.attr('id') === 'contacts-link'){
      router.navigate('contacts', {trigger:true});
    } else if (this.attr('id') === 'create-new-link'){
      router.navigate('contacts/new', {trigger:true});
    } else if (this.attr('id') === 'settings'){
      router.navigate('profile/settings', {trigger:true});
    }
  });
  $header.find('button').on('click', function(){
    $ajax({
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
        console.log('you have logged out');
      },
      error: function(){
        console.log('ERROR, you failed to logout');
      }
    });
  });
  return $header;
}
export default renderHeader;