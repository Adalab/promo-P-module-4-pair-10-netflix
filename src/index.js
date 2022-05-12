const express = require('express');
const cors = require('cors');
const Allmovies = require('./movies.json');

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

server.get('/movies', (req, res) => {
  console.log('Vamos a preparar un JSON');
  res.json({
    success: true,
    movies: Allmovies,
  });
});
