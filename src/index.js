const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');


const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect("mongodb+srv://api-instagram:api-instagram@cluster0-6b2bu.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true, // Configuracao para identificar o formato da conexao nova a partir de uma String.
    useUnifiedTopology: true
});

app.use((req, resp, next) => {
    req.io = io;

    next(); // Garantirá que esse middleware seja executado, porem os outros middlewares executados depois
            // tambem sejam executados
});

app.use(cors());

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

app.use(require('./routes'));

server.listen(8080);
