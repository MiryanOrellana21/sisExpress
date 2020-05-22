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
        var xEmail = document.getElementById("xHEmail");
        xEmail.value=user.email;
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
                
                <th>${doc.data().DNIPACIENTE}</th>
                <th>${doc.data().ESPECIALIDAD}</th>                                   
                <th>${doc.data().FECHA}</th>
                <th>${doc.data().HORA}</th>
                <th>${doc.data().ESTADO}</th>
                <th><button class="btn btn-primary" onclick="RegistrarReceta('${doc.id}')"><i class="fa fa-edit"></></button></th>
            </tr>`
        });
    })
});


function RegistrarReceta(id) {
    $('#myModal').modal('show'); // abrir
    //$('#myModalExito').modal('hide'); // cerrar
    var docRef = db.collection("Citas").doc(id);
    docRef.get().then(function (doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            var tablaM = document.getElementById("tablaModal");
            tablaM.innerHTML='';
            var boton = document.getElementById("btnGuardar");
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
                    <td>PESO</td>
                    <td><input type="text" id="txtPeso" name="txtPeso" Value="${doc.data().PESO}" class="form-control"></td>
                </tr>
                <tr>
                    <td>TALLA</td>
                    <td><input type="text" id="txtTalla" name="txtTalla" Value="${doc.data().TALLA}" class="form-control"></td>
                </tr>
                <tr>
                    <td>PRESION</td>
                    <td><input type="text" id="txtPresion" name="txtPresion" Value="${doc.data().PRESION}" class="form-control"></td>
                </tr>
                <tr>
                    <td>DIAGNOSTICO</td>
                    <td><input type="text" id="txtDiagnostico" name="txtDiagnostico" Value="${doc.data().DIAGNOSTICO}" class="form-control"></td>
                </tr>
                <tr>
                    <td>RECETA</td>
                    <td><input type="text" id="txtReceta" name="txtReceta" Value="${doc.data().RECETA}" class="form-control"></td>
                </tr>`;
                boton.onclick = function () {
                    var db = firebase.firestore();
                    var UsuarioRef = db.collection("Citas").doc(id);
                    var xDiag = document.getElementById("txtDiagnostico").value;
                    var xDniM = document.getElementById("xHEmail").value;
                    var xPeso = document.getElementById("txtPeso").value;
                    var xPresion = document.getElementById("txtPresion").value;
                    var xReceta = document.getElementById("txtReceta").value;
                    var xTalla = document.getElementById("txtTalla").value;
            
                    return UsuarioRef.update({
                        'DIAGNOSTICO': xDiag,
                        'DNIMEDICO': xDniM,
                        'PESO': xPeso,
                        'PRESION': xPresion,
                        'RECETA': xReceta,
                        'TALLA':xTalla,
                        'ESTADO':"CON RECETA",
                    })
                        .then(function () {
                            console.log("Registro Modificado Correctamente");
                            $('#myModal').modal('hide');
                            
                            document.getElementById("txtDiagnostico").value = "";
                            document.getElementById("xHEmail").value = "";
                            document.getElementById("txtPeso").value = "";
                            document.getElementById("txtPresion").value = "";
                            document.getElementById("txtReceta").value = "";
                            document.getElementById("txtTalla").value = "";
                        })
                        .catch(function (error) {
                            console.error("Error al Modificar registro: ", error);
                        });
                }
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