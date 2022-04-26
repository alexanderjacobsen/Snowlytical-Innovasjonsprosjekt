import { createApp } from 'vue'
import App from './App.vue'

import { initializeApp } from 'firebase/app'




const firebaseConfig = {
    apiKey: "AIzaSyDCaboI9Wsd1oz4Q2YWOen0xwgk8taJgx4",
    authDomain: "innovasjonsprosjekt-ccba7.firebaseapp.com",
    databaseURL: "https://innovasjonsprosjekt-ccba7-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "innovasjonsprosjekt-ccba7",
    storageBucket: "innovasjonsprosjekt-ccba7.appspot.com",
    messagingSenderId: "529445212501",
    appId: "1:529445212501:web:b7e11a48e8c599205fdfdc",
    measurementId: "G-2VNRHYMS3F"
};



initializeApp(firebaseConfig);

createApp(App).mount('#app')
