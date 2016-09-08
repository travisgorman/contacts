let session = {
  username : ''
};

// const Session = Backbone.Model.extend({
//   urlRoot: `/login`,
//   defaults: {
//     username: '',
//     authtoken: ''
//   },
//   //need to IGNORE THE PASSWORD
//   parse: function(response){
//     return {
//       authtoken: response._kmd.authtoken
//       username: response.username,
//       userId: response._id
//     }
//   }
// });


export default session;
