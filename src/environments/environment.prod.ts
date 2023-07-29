import _firebase from '../../firebase.json'
export const environment = {
  firebase: {
    projectId: _firebase.projectId,
    appId: _firebase.appId,
    storageBucket: _firebase.storageBucket,
    apiKey: _firebase.apiKey,
    authDomain: _firebase.authDomain,
    messagingSenderId: _firebase.messagingSenderId,
  },
  production: true
};
