const express = require('express');
const cors = require('cors');
//IMPORTO JSON
const allMovies = require('./movies.json');
//IMPORTO BBDD
const Database = require('better-sqlite3');

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

//motor de plantillas
server.set('view engine', 'ejs');

// init express aplication --> ESCUCHO SERVIDOR
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

//BBDD PELICULAS Y REGISTRO
const db = new Database('./src/database.db', { verbose: console.log });

// ENDPOINT para REGISTRO de USUARIAS
server.post('/signup', (req, res) => {
  console.log(req.body);
  const query = db.prepare(
    `INSERT INTO Register (email, password) VALUES (? , ? )`
  );
  const registerData = query.run(req.body.email, req.body.password);

  res.json({
    success: true,
    userId: 'nuevo-id-añadido',
  });
});

// ENDPOINT para obtener los datos de la BBDD
server.get('/movies', (req, res) => {
  const query = db.prepare(`SELECT * FROM moviesList`);
  const movieList = query.all();
  console.log(movieList);
  res.json({ success: true, movies: movieList });
});

//ENDPOINT --> para obtener todos los datos del JSON
/* server.get('/movies', (req, res) => {
    console.log('Vamos a preparar un JSON');
    res.json({
      success: true,
      movies: allMovies,
    });
  });*/

//ENDPOINT para obtener los datos filtrados por genero
/* server.get('/movies', (req, res) => {
    const genderFilterParams = req.query.gender ? req.query.gender : '';
    console.log('Vamos a preparar un JSON');
  
    res.json({
      success: true,
      movies: Allmovies,
      movies: allMovies.filter((eachMovie) =>
        eachMovie.gender.includes(genderFilterParams)
      ),
    });
  });*/

//SELECT PARA EL MOTOR DE PLANTILLAS - peli sacada de la BBDD
server.get('/movie/:movieId', (req, res) => {
  const query = db.prepare('SELECT * FROM moviesList WHERE movieId = ?');
  const movieFound = query.get(req.params.movieId);
  console.log(movieFound);
  res.render('movie', movieFound);
});

//ID peli que se renderiza en motor de plantilla - peli sacada del JSON
/*server.get('/movie/:movieId', (req, res) => {
  console.log(req.params.movieId);
  const movieFound = allMovies.find(
    (movieItem) => movieItem.id === req.params.movieId
  );
  console.log(movieFound);
  res.render('movie', movieFound);
});*/

//react lista
const staticServerPathWeb = './src/public-react'; // En esta carpeta ponemos los ficheros estáticos
server.use(express.static(staticServerPathWeb));

//imagenes
const staticServerPathWebImage = './src/public-movies-images'; // En esta carpeta ponemos los ficheros estáticos
server.use(express.static(staticServerPathWebImage));
