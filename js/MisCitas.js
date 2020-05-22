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
        //var xEmail = document.getElementById("HFxEmail");
        xImg.src = user.photoURL;
        //xEmail.value = user.email;
        Listar(user.email);
        btn.style.display="block";
    } else {
        console.log("Sin Authenticar");
        // No user is signed in.
        btn.style.display="none";
    }
});
//SE ACTUALIZA LOS DATOS DE MANERA AUTOMATICA
function Listar(xEmail) {
    var db = firebase.firestore();
    var table = document.getElementById("tabla");
    //var xEmail = document.getElementById("HFxEmail").value;
    db.collection("Citas").where("EMAIL", "==", xEmail).onSnapshot((querySnapshot) => {
        table.innerHTML = '';
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            if (doc.data().ESTADO == "APERTURA") {
                tabla.innerHTML += `
                <tr>
                    <th>${doc.data().DNIPACIENTE}</th>
                    <th>${doc.data().ESPECIALIDAD}</th>                                   
                    <th>${doc.data().CONSULTORIO}</th>
                    <th>${doc.data().FECHA}</th>
                    <th>${doc.data().HORA}</th>
                    <th>${doc.data().ESTADO}</th>
                    <th><button class="btn btn-danger" onclick="Eliminar('${doc.id}')"><i class="fa fa-trash-o"></i></button></th>
                    <th><button class="btn btn-primary" onclick="Editar('${doc.id}','${doc.data().ESPECIALIDAD}','${doc.data().CONSULTORIO}','${doc.data().FECHA}','${doc.data().HORA}')"><i class="fa fa-edit"></i></button></th>
                </tr>`
            }
            else {
                tabla.innerHTML += `
                <tr>
                    <th>${doc.data().DNIPACIENTE}</th>
                    <th>${doc.data().ESPECIALIDAD}</th>                                   
                    <th>${doc.data().CONSULTORIO}</th>
                    <th>${doc.data().FECHA}</th>
                    <th>${doc.data().HORA}</th>
                    <th>${doc.data().ESTADO}</th>
                    <th><button class="btn btn-success" onclick="VerDetalle('${doc.id}')"><i class="fa fa-check-square" title="Detalles"></i></button></th>
                </tr>`
            }
        });
    })
}
//Eliminar documento
function Eliminar(id) {
    var db = firebase.firestore();
    db.collection("Citas").doc(id).delete().then(function () {
        console.log("Registro eliminado");
    }).catch(function (error) {
        console.log("Error al eliminar registro");
    });
}

//Actualizar Registro
function Editar(id, especialidad, consultorio, fecha, hora) {
    document.getElementById("sEspecialidad").value = especialidad;
    document.getElementById("sConsultorio").value = consultorio;
    document.getElementById("txtFecha").value = fecha;
    document.getElementById("txtHora").value = hora;

    var boton = document.getElementById("btnModificar");
    boton.style.display = "block";
    var botonr = document.getElementById("btnReservar");
    botonr.style.display = "none";
    boton.onclick = function () {
        var db = firebase.firestore();
        var UsuarioRef = db.collection("Citas").doc(id);
        var xEspe = document.getElementById("sEspecialidad").value;
        var xConsul = document.getElementById("sConsultorio").value;
        var xFecha = document.getElementById("txtFecha").value;
        var xHora = document.getElementById("txtHora").value;
        var xObs = document.getElementById("txtObs").value;

        return UsuarioRef.update({
            'ESPECIALIDAD': xEspe,
            'CONSULTORIO': xConsul,
            'FECHA': xFecha,
            'HORA': xHora,
            'OBSERVACION': xObs,
        })
            .then(function () {
                console.log("Registro Modificado Correctamente");
                boton.style.display = "none";
                botonr.style.display = "block";

                document.getElementById("sEspecialidad").value = "Medicina General";
                document.getElementById("sConsultorio").value = "1";
                document.getElementById("txtFecha").value = "";
                document.getElementById("txtHora").value = "";
                document.getElementById("txtObs").value = "";
            })
            .catch(function (error) {
                console.error("Error al Modificar registro: ", error);
            });
    }
}

$('#btnReservar').click(function () {
    var db = firebase.firestore();
    var xEmail = document.getElementById("HFxEmail").value;
    var docRef = db.collection("Usuarios").where("EMAIL", "==", xEmail)
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                Registrar(xEmail, doc.data().DOCU);
            });
        })
        .catch(function (error) {
            console.log("Error en registro: ", error);
        });
});

function Registrar(xEmail, docu) {
    var xEspe = document.getElementById("sEspecialidad").value;
    var xConsul = document.getElementById("sConsultorio").value;
    var xFecha = document.getElementById("txtFecha").value;
    var xHora = document.getElementById("txtHora").value;
    var xObs = document.getElementById("txtObs").value;

    var db = firebase.firestore();
    db.collection("Citas").add({
        'EMAIL': xEmail,
        'DNIPACIENTE': docu,
        'DNIMEDICO': "",
        'ESPECIALIDAD': xEspe,
        'CONSULTORIO': xConsul,
        'FECHA': xFecha,
        'HORA': xHora,
        'OBSERVACION': xObs,
        'PESO': "",
        'TALLA': "",
        'PRESION': "",
        'DIAGNOSTICO': "",
        'RECETA': "",
        'ESTADO': "APERTURA",
    })
        .then(function (docRef) {
            alert("REGISTRADO CORRECTAMENTE, CON ID: " + docRef.id);
        })
        .catch(function (error) {
            console.log("error");
        });
}

function VerDetalle(){
    console.log("PROBANNNNNNNNNDOOOOOOOOOOOOOOOOOOOO");
}

function CerrarSesion()
 {
     firebase.auth().signOut()
     .then(function(){
        console.log("Salir");
     }).catch(function(error){
         console.log(error);
     });
 }