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

var db = firebase.firestore();
$('#btnBuscar').click(function () {
    var xNDoc = document.getElementById("txtNumDoc").value;


    var table = document.getElementById("tabla");
    db.collection("Citas").where("DNIPACIENTE", "==", xNDoc).onSnapshot((querySnapshot) => {
        table.innerHTML = '';
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            tabla.innerHTML += `
            <tr>
                <th scope="row">${doc.id}</th>
                <th>${doc.data().DNIPACIENTE}</th>
                <th>${doc.data().ESPECIALIDAD}</th>                                   
                <th>${doc.data().FECHA}</th>
                <th>${doc.data().HORA}</th>
                <th>${doc.data().ESTADO}</th>
                <th><button class="btn btn-primary" onclick="VerDetalle('${doc.id}')"><i class="fa fa-book"></></button></th>
            </tr>`
        });
    })
});


function VerDetalle(id) {
    $('#myModal').modal('show'); // abrir
    //$('#myModalExito').modal('hide'); // cerrar
    var docRef = db.collection("Citas").doc(id);
    docRef.get().then(function (doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            var tablaM = document.getElementById("tablaModal");
            tablaM.innerHTML='';
            tablaM.innerHTML +=`
                <tr>
                    <td>DNI</td>
                    <td>${doc.data().DNIPACIENTE}</td>
                </tr>
                <tr>
                    <td>ESPECIALIDAD</td>
                    <td>${doc.data().ESPECIALIDAD}</td>
                </tr>
                <tr>
                    <td>CONSULTORIO</td>
                    <td>${doc.data().CONSULTORIO}</td>
                </tr>
                <tr>
                    <td>FECHA</td>
                    <td>${doc.data().FECHA}</td>
                </tr>
                <tr>
                    <td>HORA</td>
                    <td>${doc.data().HORA}</td>
                </tr>
                <tr>
                    <td>OBSERVACION</td>
                    <td>${doc.data().OBSERVACION}</td>
                </tr>
                <tr>
                    <td>DNIMEDICO</td>
                    <td>${doc.data().DNIMEDICO}</td>
                </tr>
                <tr>
                    <td>PESO</td>
                    <td>${doc.data().PESO}</td>
                </tr>
                <tr>
                    <td>TALLA</td>
                    <td>${doc.data().TALLA}</td>
                </tr>
                <tr>
                    <td>PRESION</td>
                    <td>${doc.data().PRESION}</td>
                </tr>
                <tr>
                    <td>DIAGNOSTICO</td>
                    <td>${doc.data().DIAGNOSTICO}</td>
                </tr>
                <tr>
                    <td>RECETA</td>
                    <td>${doc.data().RECETA}</td>
                </tr>
                <tr>
                    <td>ESTADO</td>
                    <td>${doc.data().ESTADO}</td>
                </tr>`
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function (error) {
        console.log("Error en ver detalles:", error);
    });
}
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