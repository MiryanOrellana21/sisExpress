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
  var Ingresar = document.getElementById("aIngresar");
  var Cerrar = document.getElementById("aCerrarSesion");
  if (user) {
    var img = document.getElementById("photo");
    img.src = user.photoURL;
    Cerrar.style.display="block";
    Ingresar.style.display="none";
  } else {
    console.log("error");
    // No user is signed in.
    Cerrar.style.display="none";
    Ingresar.style.display="block";
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