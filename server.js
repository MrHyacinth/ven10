// https://www.thepolyglotdeveloper.com/2019/02/building-rest-api-mongodb-mongoose-nodejs/

require('dotenv').config();
const http = require('http');
const mongoose = require('mongoose');
const app = require('./server/app');

const port = process.env.PORT || 3000;

let MONGO_URL;

const { DEV_MONGO_URL, PROD_MONGO_URL, NODE_ENV } = process.env;

if (NODE_ENV == 'production') {
  MONGO_URL = PROD_MONGO_URL;
} else {
  MONGO_URL = DEV_MONGO_URL;
}

mongoose.connect(MONGO_URL, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', () => console.log('error in connection to db'));
db.once('open', () => console.log('connected to database'));

app.set('port', port);

const server = http.createServer(app);

// Event listener for HTTP server "error" event.
function onError(err) {
  if (err.syscall !== 'listen') {
    throw err;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (err.code) {
    case 'EACCES':
      console.log(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.log(`${bind} port ${port} is in use`);
      process.exit(1);
      break;
    default:
      throw err;
  }
}

// Event listener for HTTP server "listening" event
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`App running on ${bind}`);
}

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
