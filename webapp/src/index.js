import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebaseAdmin from 'firebase-admin';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const accountKey = require('./uberg-AccountKey.json');


firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(accountKey)
});


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
