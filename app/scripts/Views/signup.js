import $ from 'jquery';
import Backbone from 'backbone';

import router from '../router';
import settings from '../settings';
import session from '../models/session';
import renderLogin from './login';

function renderSignup(){
  let $signup = $(`
    <div id="signup">
    		<div class="sub-signup-container">
    			<h3>Sign Up</h3>
    			<form class="signup-form">
    				<input id="new-username" type="text" name="username" placeholder="username">
    				<input id="pw1" class="password-input" type="password" name="password" placeholder="password">
    				<input id="pw2" class="password-input" type="password" name="confirm-password" placeholder="confirm password">
    				<button id="signup-submit" class="signup-btn">Enter</button>
    			</div>
    		</div>
    	</div>
    </div>
    `);

    $signup.find('#signup-submit').on('click', function(evt){
      evt.preventDefault();
      let username = $('#new-username').val();
      let password1 = $('#pw1').val();
      let password2 = $('#pw2').val();
      let $login = renderLogin();
      let encrypted = btoa(settings.appKey + ':' + settings.appSecret);

      if (password1 !== password2) {
        console.log('your passwords don\'t match!');
        // $login.find('#login-modal').effect('shake');
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
            //stores session usename in session storage
              //'JSON.stringify(session)' will become 'JSON.stringify(store.session);'
            sessionStorage.session = JSON.stringify(session);
            router.navigate('/contacts', {trigger:true});
            console.log(session, ' === session username');

            $('#new-username').val('');
            $('#pw1').val('');
            $('#pw1').val('');

          },
          error: function(){
            console.log('Error! You failed to make a new user! Check login.js or router.js');
          }
        });
      }
    });
  return $signup;
}

export default renderSignup;
