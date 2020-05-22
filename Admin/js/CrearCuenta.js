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
db.collection("Usuarios").onSnapshot((querySnapshot) => {
    table.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        tabla.innerHTML += `
            <tr>
                <th>${doc.data().DOCU}</th>
                <th>${doc.data().EMAIL}</th>                                   
                <th>${doc.data().FECNAC}</th>
                <th>${doc.data().NCELULAR}</th>
                <th>${doc.data().NOMBRES}</th>
                <th>${doc.data().SEXO}</th>
                <th>${doc.data().TEMPLEADO}</th>
                <th><button class="btn btn-danger" onclick="Eliminar('${doc.id}')">Eliminar</button></th>
                <th><button class="btn btn-primary" onclick="Editar('${doc.id}','${doc.data().DOCU}','${doc.data().EMAIL}','${doc.data().FECNAC}','${doc.data().NCELULAR}','${doc.data().NOMBRES}','${doc.data().SEXO}','${doc.data().TEMPLEADO}')">Editar</button></th>
            </tr>`
    });
})
//.catch(function (error) {
//    console.log("Error getting documents: ", error);
//});
//Eliminar documento
function Eliminar(id) {
    db.collection("Usuarios").doc(id).delete().then(function () {
        console.log("Registro eliminado");
    }).catch(function (error) {
        console.log("Error al eliminar registro");
    });
}

//Actualizar Registro
function Editar(id, docu, email, fecnac, ncelular, nombres, sexo, templeado) {
    document.getElementById("txtNumDoc").value = docu;
    document.getElementById("txtNombres").value = nombres;
    document.getElementById("txtFecNac").value = fecnac;
    document.getElementById("txtTel").value = ncelular;
    if (sexo == "M") {
        document.getElementById("sex1").checked = true;
    } else {
        document.getElementById("sex2").checked = true;
    }
    document.getElementById("txtCorreo").value = email;
    document.getElementById("sTEmpleado").value = templeado;

    var boton = document.getElementById("btnModificar");
    boton.style.display = "block";
    var botonr = document.getElementById("btnRegistrar");
    botonr.style.display = "none";
    boton.onclick = function () {
        var UsuarioRef = db.collection("Usuarios").doc(id);
        var xNDoc = document.getElementById("txtNumDoc").value;
        var xNombres = document.getElementById("txtNombres").value;
        var xFecNac = document.getElementById("txtFecNac").value;
        var xTele = document.getElementById("txtTel").value;
        var xSexo = $('input:radio[name=inlineRadioOptions]:checked').val();
        var xEmail = document.getElementById("txtCorreo").value;
        var xTEmpleado = document.getElementById("sTEmpleado").value;

        return UsuarioRef.update({
            'DOCU': xNDoc,
            'EMAIL': xEmail,
            'FECNAC': xFecNac,
            'NCELULAR': xTele,
            'NOMBRES': xNombres,
            'SEXO': xSexo,
            'TEMPLEADO': xTEmpleado,
            'TIPOD': '1'
        })
            .then(function () {
                console.log("Registro Modificado Correctamente");
                boton.style.display = "none";
                botonr.style.display = "block";
                document.getElementById("txtNumDoc").value = '';
                document.getElementById("txtNombres").value = '';
                document.getElementById("txtFecNac").value = '';
                document.getElementById("txtTel").value = '';
                document.getElementById("sex1").checked = false;
                document.getElementById("sex2").checked = false;
                document.getElementById("txtCorreo").value = '';
                document.getElementById("sTEmpleado").value = "CLIENTE";
            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error al Modificar registro: ", error);
            });
    }
}

$('#btnRegistrar').click(function () {
    var xNDoc = document.getElementById("txtNumDoc").value;
    var xNombres = document.getElementById("txtNombres").value;
    var xFecNac = document.getElementById("txtFecNac").value;
    var xTele = document.getElementById("txtTel").value;
    var xSexo = $('input:radio[name=inlineRadioOptions]:checked').val();
    var xEmail = document.getElementById("txtCorreo").value;
    var xTEmpleado = document.getElementById("sTEmpleado").value;

    var db = firebase.firestore();
    db.collection("Usuarios").add({
        'DOCU': xNDoc,
        'EMAIL': xEmail,
        'FECNAC': xFecNac,
        'NCELULAR': xTele,
        'NOMBRES': xNombres,
        'SEXO': xSexo,
        'TEMPLEADO': xTEmpleado,
        'TIPOD': '1',
    })
        .then(function (docRef) {
            alert("REGISTRADO CORRECTAMENTE, CON ID: " + docRef.id);
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