const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT);

const googleverify = async (idToken = '') => {

  const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });

  const {name:nombre, 
    picture:img, 
    email:correo} = ticket.getPayload();
  return {
    
    nombre, img, correo
  };

}


module.exports= {
    googleverify
}
