import $ from 'jquery';
import Backbone from 'backbone';

import router from '../router';
import settings from '../settings';
import session from '../models/session';
import renderSignup from './signup';

function renderLogin(){
  let $login = $(`
    <div id="login">
      <div class="login-modal">
        <div class="login-section">
          <h2>Login</h2>
          <input id="username" type="text" name="username" placeholder="username">
          <input id="password" type="password" name="password" placeholder="password">
          <button class="login-btn">Enter</button>
        </div>
        <div class="sub-signup-section">
          <h3>Don't have an account?</h3>
          <button class="signup-btn">Sign up</button>
        </div>
      </div>
    </div>
    `);

    $login.find('.signup-btn').on('click', function(evt){
      evt.preventDefault();
      router.navigate('login/signup', {trigger:true});
    });

    $login.find('.login-btn').on('click', function(evt){
      evt.preventDefault();
      let username = $('#username').val();
      let password = $('#password').val();
      let encrypted = btoa(settings.appKey + ':' + settings.appSecret);
      $.ajax({
        type: 'POST',
        url: `https://baas.kinvey.com/user/${settings.appKey}/login`,
        data: JSON.stringify({
          username: username,
          password: password
        }),
        headers: {
          Authorization: `Basic ${encrypted}`
        },
        contentType: 'application/json',
        success: function(response){
          session.username = username;
          session.authtoken = response._kmd.authtoken;
          sessionStorage.session = JSON.stringify(session);
          router.navigate('/contacts', {trigger:true});
          console.log(session, ' === session username');
          $('#username').val('');
          $('#password').val('');
        },
        error: function(){
          console.log('Error! You failed to login! Check login.js or router.js');
        }
      });

    });
  return $login;
}

export default renderLogin;
