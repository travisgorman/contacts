import Backbone from 'backbone'
import $ from 'jquery'
import settings from '../settings'
import session from '../Models/session'
import renderSignup from './signup'
import router from '../router'

function renderLogin(){
  let $login = $(`
    <div id="login">
      <div className="login-modal">
        <div className="login-section">
          <h2>Login</h2>
          <input type="text"
            id="username"
            name="username"
            placeholder="username"/>
          <input type="password" 
            id="password" 
            name="password"
            placeholder="password"/>
          <button class="login-btn">Enter</button>
        </div>
        <div className="sub-signup-section">
          <h3>Don't have an account?</h3>
          <button className="signup-btn">Sign up</button>
        </div>
      </div>
    </div> 
  `)
  $login.find('.signup-btn').on('click', function(e){
    e.preventDefault();
    router.navigate('login/signup', {trigger:true});
  });
  $login.find('.login-btn').on('click', function(e){
    e.preventDefault();
    let username = $('#username').val();
    let password = $('#password').val();
    let encrypted = btoa(settings.appKey + ':' + settings.appSecret);
    $.ajax({
      type: 'POST',
      url: `http://baas.kinvey.com/user/${settings.appKey}/login`,
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
        console.log( session, 'session username' );
        $('#username').val('');
        $('#password').val('');
      },
      error: function(){
        console.log( 'ERROR' );
      }
    });
  });
  return $login;
}
export default renderLogin;