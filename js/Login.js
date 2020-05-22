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
  var Cerrar = document.getElementById("aCerrarSesion");
  
  if (user) {
    var img = document.getElementById("photo");
    var divi = document.getElementById("divIngresar");
    img.src = user.photoURL;
    divi.style.display = "none";
    var divr = document.getElementById("divRegistros");
    divr.style.display = "block";
    //console.log(x);
    Cerrar.style.display="block";
  } else {
    console.log("SIN AUTHENTICACIÓN");
    // No user is signed in.
    Cerrar.style.display="none";
  }
});

$('#btnIngresar').click(function () {
  if (!firebase.auth().currentUser) {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
      .signInWithPopup(provider)
      .then(function (result) {
        //console.log(result.user.photoURL);
        var img = document.getElementById("photo");
        img.src = result.user.photoURL;

        VerificarRegistro(result.user.email);
        //console.log(img.src);
        //url.src=result.user.photourl
      }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.messaje;
        var errorEmail = error.email;
        var credential = error.credential;
      });
  }
});
function VerificarRegistro(email) {
  console.log(email);
  var db = firebase.firestore();
  var docref = db.collection("Usuarios").where("EMAIL", "==", email)
    //.limi.orderBy("id", "desc")
    .limit(1);
  docref.get()
    .then(function (querySnapshot) {
      console.log(querySnapshot.docs);
      if (querySnapshot.docs.length > 0) {
        //console.log("existe");
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          
          switch(doc.data().TEMPLEADO) {
            case "DOCTOR":
              document.location.href = "Doctor/Inicio.html";
              break;
            case "ENFERMERA":
              document.location.href = "Enfermera/Inicio.html";
              break;
              case "ADMINISTRADOR":
                document.location.href = "Admin/Inicio.html";
                break;
            default:
              // code block
          }
        })
      }
      else {
        //console.log("No existe registro");
        document.location.href = "Registrarse.html";
      }
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
}
//ir a mis citas
$('#btnMisCitas').click(function () {

  document.location.href = "MisCitas.html";
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