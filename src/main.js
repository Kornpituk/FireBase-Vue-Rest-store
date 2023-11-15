import './assets/newMain.css'

import { createApp } from 'vue'
import { Quasar } from 'quasar'

// import font Awesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'
import App from './App.vue'
import router from './router'
import { getAuth } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNdtKjYu7Lrhr5qYZddLA_2Fv0uXyaRkM",
  authDomain: "vue-auth-firebase-8a73c.firebaseapp.com",
  projectId: "vue-auth-firebase-8a73c",
  storageBucket: "vue-auth-firebase-8a73c.appspot.com",
  messagingSenderId: "822307011989",
  appId: "1:822307011989:web:07eb6b91aa426ae3ed0a9c"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const app = createApp(App)
const auth = getAuth(firebaseApp);
app.use(router)
app.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
})

// Initialize Font Awesome
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app')
