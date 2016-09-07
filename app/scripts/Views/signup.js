import Backbone from 'backbone'
import $ from 'jquery'
import router from '../router'
import settings from '../settings'
import session from '..Models/session'
import renderLogin from './login'

function renderSignup(){
  let $signup = $(`
    <div id="signup">
      <div className="sub-signup-container">
        <h3>Sign Up</h3>
        <form class="signup-form">
          <input id="new-username" 
            type="text" 
            name="username"
            placeholder="username">
          <input id="pw1"
            class="password-input" 
            type="password" 
            name="password"
            placeholder="password">
          <input id="pw2"
            class="password-input"
            type="password"
            name="confirm-password"
            placeholder="confirm password">
          <button id="signup-submit" 
            class="signup-btn">
            Enter
          </button>
        </form>
      </div>
    </div>
  `)

  $signup.find('#singup-submit').on('click', function(e){
    e.preventDefault();
    let username = $('#new-username').val();
    let password1 = $('#pw1').val();
    let password2 = $('#pw2').val();
    let $login = renderLogin();
    let encrypted = btoa(settings.appKey + ':' + settings.appSecret);
    if (password1 !== password2){
      console.log('passwords don\'t match');
    } else {
      $.ajax({
        type: 'POST',
        url: `https://baas.kinvey.com/user/${settings.appKey}`,
        data: JSON.stringify({
          username: username,
          password: password1
        }),
        headers: {
          Authorization: `Basic ${encrypted}`
        },
        contentType: 'application/json',
        success: function(response){
          session.username = username;
          session.authtoken = response._kmd.authtoken;
          storageSession.session = JSON.stringify(session);
          router.navigate('/contacts', {trigger: true});
          console.log(session, 'session username');
          $('#new-username').val('');
          $('#pw1').val('');
          $('#pw2').val('');
        },
        error: function(){
          console.log( 'ERROR. you did not make a new user' );
        }
      });
    }
  });
  return $signup;
}
export default renderSignup;