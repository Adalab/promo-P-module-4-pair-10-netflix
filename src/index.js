const express = require('express');
const cors = require('cors');
//IMPORTO JSON
//const allMovies = require('./movies.json');
//IMPORTO BBDD
const Database = require('better-sqlite3');
const { response } = require('express');

// CREO Y CONFIGURO EL SERVIDOR
const server = express();
//CORS --> Permite que se hagan peticiones de otros sitios a mi servidor
server.use(cors());
server.use(express.json());

//CONFIGURO MOTOR DE PLANTILLAS
server.set('view engine', 'ejs');

// init express aplication --> ESCUCHO SERVIDOR
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

//BBDD con TABLAS : PELICULAS(moviesList) Y REGISTRO (Register)
const db = new Database('./src/database.db', { verbose: console.log });

// ENDPOINT para REGISTRO de USUARIAS
//POST --> porque envío por BODY PARAMS los valores de los inputs AL SERVIDOR
server.post('/signup', (req, res) => {
  //comprobar el id del email en la BBDD
  const selectEmail = db.prepare(`SELECT email FROM Register WHERE email = ?`);

  const foundEmail = selectEmail.get(req.body.email);

  if (foundEmail === undefined) {
    //INSERT --> Incluyo los datos del body params en mi BBDD
    const query = db.prepare(
      `INSERT INTO Register (email, password) VALUES (? , ? )`
    );
    const registerData = query.run(req.body.email, req.body.password);
    console.log(registerData);
    res.json({
      success: true,
      userId: 'Nuevo-id-añadido',
    });
  } else {
    res.json({
      success: false,
      msj: 'Email existente',
    });
  }
});

// ENDPOINT para obtener los datos de la BBDD para pintar mi listado principal
//get--> pido al servidor
server.get('/movies', (req, res) => {
  const query = db.prepare(`SELECT * FROM moviesList`);
  //query all --> porque recibo un array de objetos
  const movieList = query.all();
  //Filro para filtrar por genero. Hago filtro sobre mi BBDD
  //Recibo por query params los generos.
  //si esta vacío devuelvo todo, si no pinto por el genero recibido
  const movieFilter = movieList.filter((movie) => {
    if (req.query.gender === '') {
      return true;
    } else {
      return movie.gender === req.query.gender ? true : false;
    }
  });
  //respondo un JSON porque pinto en mi estático
  res.json({ success: true, movies: movieFilter });
});

//ENDPOINT --> para obtener todos los datos del JSON
/* server.get('/movies', (req, res) => {
    console.log('Vamos a preparar un JSON');
    res.json({
      success: true,
      movies: allMovies,
    });
  });*/

//SELECT PARA EL MOTOR DE PLANTILLAS - peli sacada de la BBDD
//Los uso para pintar el detalle de cada peli
//chequeo en la url ---> movie/1 = gambito de dama
server.get('/movie/:movieId', (req, res) => {
  const query = db.prepare('SELECT * FROM moviesList WHERE movieId = ?');
  const movieFound = query.get(req.params.movieId);
  console.log(movieFound);
  //respondo un render porque pinto en fichero dinámico
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

//FICHEROS ESTÁTICOS DE REACT
const staticServerPathWeb = './src/public-react';
server.use(express.static(staticServerPathWeb));

//FICHERO DE ESTÁTICO DE LAS IMAGENES
const staticServerPathWebImage = './src/public-movies-images';
server.use(express.static(staticServerPathWebImage));
