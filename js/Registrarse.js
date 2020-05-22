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
    var btn = document.getElementById("btnCerrar");
    if (user) {
        var xImg = document.getElementById("photo");
        var xEmail = document.getElementById("txtCorreo");
        var xNombres = document.getElementById("txtNombres");
        //var Mensaje=document.getElementById("txtMensaje");
        xImg.src = user.photoURL;

        xEmail.value = user.email;
        xEmail.disabled = true;
        xNombres.value = user.displayName;
        xNombres.disabled = true;
        btn.style.display="block";
    } else {
        console.log("Sin Authenticar");
        // No user is signed in.
        btn.style.display="none";
    }
});

$('#btnRegistrar').click(function () {
    var xEmail = document.getElementById("txtCorreo").value;
    var xNombres = document.getElementById("txtNombres").value;
    var xNDoc = document.getElementById("txtNumDoc").value;
    var xFecNac = document.getElementById("txtFecNac").value;
    var xTele = document.getElementById("txtTel").value;
    var xSexo = $('input:radio[name=inlineRadioOptions]:checked').val();
    var db = firebase.firestore();
    db.collection("Usuarios").add({
        'DOCU': xNDoc,
        'EMAIL': xEmail,
        'FECNAC': xFecNac,
        'NCELULAR': xTele,
        'NOMBRES': xNombres,
        'SEXO': xSexo,
        'TEMPLEADO': 'CLIENTE',
        'TIPOD': '1',
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