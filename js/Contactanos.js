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
    var xImg = document.getElementById("photo");
    var xEmail = document.getElementById("txtCorreo");
    var xNombres = document.getElementById("txtNombres");
    //var Mensaje=document.getElementById("txtMensaje");
    xImg.src = user.photoURL;
    xEmail.value = user.email;
    xNombres.value = user.displayName;
    // User is signed in.
    Cerrar.style.display="block";
    Ingresar.style.display="none";
  } else {
    console.log("error");
    // No user is signed in.
    Cerrar.style.display="none";
    Ingresar.style.display="block";
  }
});

$('#btnRegistrar').click(function () {
  var xEmail = document.getElementById("txtCorreo").value;
  var xNombres = document.getElementById("txtNombres").value;
  var xMensaje = document.getElementById("txtMensaje").value;
  var db = firebase.firestore();
  db.collection("Contactanos").add({
    'EMAIL': xEmail,
    'NOMBRES': xNombres,
    'MENSAJE': xMensaje,
    'PROCESO': "INICIADO",
    'VALIDA': true,
  })
    .then(function (docRef) {
      alert("REGISTRADO CORRECTAMENTE, CON ID: " + docRef.id);
      document.location.href = "CitasLinea.html";
    })
    .catch(function (error) {
      console.log("error");
    });
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