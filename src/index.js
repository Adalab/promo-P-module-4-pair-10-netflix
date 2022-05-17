const express = require('express');
const cors = require('cors');
//guardo el json de mi listado de peliculas
const allMovies = require('./movies.json');

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

//motor de plantillas
server.set('view engine', 'ejs');

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

//id pelicula que se renderiza
server.get('/movie/:movieId', (req, res) => {
  console.log(req.params.movieId);
  const movieFound = allMovies.find(
    (movieItem) => movieItem.id === req.params.movieId
  );
  console.log(movieFound);
  res.render('movie', movieFound);
});

//react lista
const staticServerPathWeb = './src/public-react'; // En esta carpeta ponemos los ficheros estáticos
server.use(express.static(staticServerPathWeb));

//imagenes
const staticServerPathWebImage = './src/public-movies-images'; // En esta carpeta ponemos los ficheros estáticos
server.use(express.static(staticServerPathWebImage));
