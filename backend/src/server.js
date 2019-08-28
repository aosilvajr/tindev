const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const routes = require('./routes')

const app = express()

// Unindo com um servidor WS (WebSocket)
// Então agora aceita requisições WebSocket e HTTP
const server = require('http').Server(app);

// Chamando a função, então passando o servidor
const io = require('socket.io')(server);

const connectedUsers = {

}

io.on('connection', socket => {
  const { user } = socket.handshake.query

  connectedUsers[user] = socket.id;
})

app.use((req, res, next) => {
  req.io = io // Para não importar de novo no controller
  req.connectedUsers = connectedUsers;

  return next();
});

app.use(morgan('dev'));
app.use(cors());
app.use(express.json()) // Importante ficar no topo pq senão o app não identifica o corpo das requisições
app.use(routes)

mongoose.connect('mongodb+srv://StrikerEureka12:*mongoDB0612@clusterapi-av9rp.mongodb.net/omnistack?retryWrites=true&w=majority', {
  useNewUrlParser: true,
})

server.listen(3333)