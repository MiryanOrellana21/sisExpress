const express = require('express');
const app = express();

app.use(express.static(__dirname + '/'));
// este es donde se escucha el server
app.listen(process.env.PORT || 3000, function() {
  console.log('Servidor web escuchando en el puerto 3000');
});