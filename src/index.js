const express = require('express');
const cors = require('cors');
//guardo el json de mi listado de peliculas
const allMovies = require('./movies.json');

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});
//pido al servidor a través de un objeto ese listado de peliculas que esta guardada en esa constante
server.get('/movies', (req, res) => {
  const genderFilterParams = req.query.gender ? req.query.gender : '';
  console.log('Vamos a preparar un JSON');

  res.json({
    success: true,
    movies: allMovies.filter((eachMovie) =>
      eachMovie.gender.includes(genderFilterParams)
    ),
  });
});
