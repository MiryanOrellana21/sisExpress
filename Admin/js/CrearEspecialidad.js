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
        var xImg = document.getElementById("photo");
        //var xEmail = document.getElementById("txtCorreo");
        //var xNombres = document.getElementById("txtNombres");
        //var Mensaje=document.getElementById("txtMensaje");
        xImg.src = user.photoURL;

        //xEmail.value = user.email;
        //xNombres.value = user.displayName;

    } else {
        document.location.href = "../index.html";
        console.log("Sin Authenticar");
        // No user is signed in.
    }
});
//SE ACTUALIZA DE MANERA AUTOMATICA LAS MODIFICACIONES Y/O REGISTROS
var db = firebase.firestore();

var table = document.getElementById("tabla");
db.collection("Especialidad").onSnapshot((querySnapshot) => {
    table.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        tabla.innerHTML += `
            <tr>
                <th>${doc.id}</th>
                <th>${doc.data().CODIGO}</th>                                   
                <th>${doc.data().DESCRIPCION}</th>
                <th><button class="btn btn-danger" onclick="Eliminar('${doc.id}')">Eliminar</button></th>
                <th><button class="btn btn-primary" onclick="Editar('${doc.id}','${doc.data().CODIGO}','${doc.data().DESCRIPCION}')">Editar</button></th>
            </tr>`
    });
})
//.catch(function (error) {
//    console.log("Error getting documents: ", error);
//});
//Eliminar documento
function Eliminar(id) {
    db.collection("Especialidad").doc(id).delete().then(function () {
        console.log("Registro eliminado");
    }).catch(function (error) {
        console.log("Error al eliminar registro");
    });
}

//Actualizar Registro
function Editar(id, codigo,descri) {
    document.getElementById("txtCodEspe").value = codigo;
    document.getElementById("txtDesEspe").value = descri;

    var boton = document.getElementById("btnModificar");
    boton.style.display = "block";
    var botonr = document.getElementById("btnRegistrar");
    botonr.style.display = "none";
    boton.onclick = function () {
        var EspeRef = db.collection("Especialidad").doc(id);
        var xCodigo = document.getElementById("txtCodEspe").value;
        var xEspecialidad = document.getElementById("txtDesEspe").value;
        return EspeRef.update({
            'CODIGO': xCodigo,
            'DESCRIPCION': xEspecialidad,
            'ESTADO': 'U'
        })
            .then(function () {
                console.log("Registro Modificado Correctamente");
                boton.style.display = "none";
                botonr.style.display = "block";
                document.getElementById("txtCodEspe").value = '';
                document.getElementById("txtDesEspe").value = '';
            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error al Modificar registro: ", error);
            });
    }
}

$('#btnRegistrar').click(function () {
    var xCodigo = document.getElementById("txtCodEspe").value;
    var xEspecialidad = document.getElementById("txtDesEspe").value;
    var db = firebase.firestore();
    db.collection("Especialidad").add({
        'CODIGO': xCodigo,
        'DESCRIPCION': xEspecialidad,
        'ESTADO': 'I',
    })
        .then(function (docRef) {
            alert("REGISTRADO CORRECTAMENTE, CON ID: " + docRef.id);
            document.getElementById("txtCodEspe").value = '';
            document.getElementById("txtDesEspe").value = '';
        })
        .catch(function (error) {
            console.log("error");
        });
});

//Cerrar Sesion
function CerrarSesion()
 {
     firebase.auth().signOut()
     .then(function(){
        console.log("Salir");
     }).catch(function(error){
         console.log(error);
     });
 }