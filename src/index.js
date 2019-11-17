const express = require('express');
const mongoose = require('mongoose');


const app = express();

mongoose.connect("mongodb+srv://api-instagram:api-instagram@cluster0-6b2bu.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true, // Configuracao para identificar o formato da conexao nova a partir de uma String.
    useUnifiedTopology: true
});

app.use(require('./routes'));

app.listen(8080);
