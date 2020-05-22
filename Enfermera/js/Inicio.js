

var firebaseConfig = {
  apiKey: "AIzaSyBw-g2GQ1gg5cyvmd8Tc2hCFQKZ8YkuzW0",
  authDomain: "websalud-3a752.firebaseapp.com",
  databaseURL: "https://websalud-3a752.firebaseio.com",
  projectId: "websalud-3a752",
  storageBucket: "websalud-3a752.appspot.com",
  messagingSenderId: "916076418152",
  appId: "1:916076418152:web:67900d736b2beb49a197dd",
  measurementId: "G-9LVL9QR7S0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    var img = document.getElementById("photo");
    img.src = user.photoURL;
  } else {
    document.location.href = "../index.html";
    console.log("error");
    // No user is signed in.
  }
});

function CerrarSesion()
 {
     firebase.auth().signOut()
     .then(function(){
        console.log("Salir");
     }).catch(function(error){
         console.log(error);
     });
 }