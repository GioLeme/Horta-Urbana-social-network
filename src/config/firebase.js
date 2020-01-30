import firebase from 'firebase';


const config = {
  apiKey: "AIzaSyALcSH4KxIyuyBmbhuJbdPDDVuBsq9o7_o",
  authDomain: "adocica-social-media.firebaseapp.com",
  databaseURL: "https://adocica-social-media.firebaseio.com",
  projectId: "adocica-social-media",
  storageBucket: "adocica-social-media.appspot.com",
  messagingSenderId: "1055677879255",
  appId: "1:1055677879255:web:56f34b762796e20114b192",
  measurementId: "G-697J66BNV4"
};

const fire = firebase.initializeApp(config);

export default fire;
