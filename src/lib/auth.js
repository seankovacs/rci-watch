import { API_ENDPOINT } from './api';

const authProvider = {
  isAuthenticated: false,
  signin(email, password, callback) {
    fetch(`${API_ENDPOINT}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    .then(res => res.json())
    .then(json => {
      // console.log(json);
      if(json.ok) {
        if(json.data) {
          authProvider.isAuthenticated = true;
          callback(json.data, null);
        }else {
          authProvider.isAuthenticated = false;
          callback(null, 'Invalid email or password.');
        }
      }else {
        authProvider.isAuthenticated = false;
        callback(null, json.error);
      }
    }).catch(error=>{
      authProvider.isAuthenticated = false;
      callback(null, error.message);
    })
  },
  signout(callback) {
    authProvider.isAuthenticated = false;
    setTimeout(callback, 100);
  },
};

export { authProvider };
