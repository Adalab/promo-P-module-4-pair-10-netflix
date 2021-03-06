// FETCH PARA FILTRAR POR GENERO EN LA URL
//le paso params como parametro
const getMoviesFromApi = (params) => {
  console.log('Se están pidiendo las películas de la app');
  //Incluyo la nueva ruta donde pediremos al servidor
  //le paso params gender
  // concateno y el filtro será un dato variable
  return fetch(`http://localhost:4000/movies?gender=${params.gender}`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const objToExport = {
  getMoviesFromApi: getMoviesFromApi,
};

export default objToExport;

//CAMBIO RUTA PARA PEDIR DATOS AL SERVIDOR
/*const getMoviesFromApi = () => {
  console.log(getMoviesFromApi);
  console.log('Se están pidiendo las películas de la app');

  return fetch('http://localhost:4000/movies')
    .then((response) => response.json())
    .then((data) => {
      //retorno lo que retorna el servidor
      return data;
    });
};

const objToExport = {
  getMoviesFromApi: getMoviesFromApi,
};

export default objToExport;*/
