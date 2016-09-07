import $ from 'jquery';
import settings from '../settings';
import user from '../Models/user';

let $login = $(`

  <div class="login">
    <form class="login-form">
      <h2>Login</h2>
      <input id="username" type="text" name="username"
      placeholder="username"/>
      <input id="password" type="password" name="password" placeholder="password"/>
      <input type="submit" name="submit" value="submit">
    </form>
  </div>

  `)

//event listener
// on click, make POST request

$login.find( 'input[type="submit"]' )
  .on( 'c1lick', function( evt ){

    // store entered values into variables`df
    // pass kinvey stuff into btoa() and store as a variable

    evt.preventDefault();
    let username =  $login.find( '#username' ).val();
    let password =  $login.find( '#password' ).val();
    let encrypted = btoa( settings.appId + ':' + settings.appSecret );

    // ajax post request
    $.ajax({
      type: 'POST',
      url: `http://baas.kinvey.com/user/${ settings.appId }/login`,
      data: JSON.stringify( {
        username: username,
        password: password
      }),
      headers: {
        Authorization: `Basic ${ encrypted }`
      },
      contentType: 'application/json',
      succsss: function( response ){
        user.username = username;
        user.authtoken = response._kmd.authtoken;
        location.hash = '#posts';
        console.log( 'it worked, you created a user' );
        console.log( user );
      },
      error: function(  ){
        console.log( 'errrrr. you didn\'t make a user' );

      }
    }); //close ajax request



  });

  export default $login;
